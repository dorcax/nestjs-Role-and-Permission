import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const { email, password, prod_name, description } = createUserDto;

    try {
      //  find user exist ,
      const userExist = await this.prisma.vendor.findUnique({
        where: {
          email,
        },
      });
      if (userExist) {
        throw new ConflictException('user already exist');
      }

      // create new user
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await this.prisma.vendor.create({
        data: {
          prod_name,
          email,
          password: hashPassword,
          description,
        },
      });
      return {
        message: 'user registered successfully',
        user: {
          id: user.id,
          name: user.prod_name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // login in user

  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;

      // find the email

      const user = await this.prisma.vendor.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new BadRequestException('invalid credentials');
      }

      // comapre password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new BadRequestException('invalid credential');
      }
      // create token for user
      if (!user.isVerified) {
        throw new BadRequestException('user is not verified');
      }

      const token = await this.jwtService.signAsync(
        { sub: user.id, role: user.role },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: this.configService.get<string>('EXPIRY'),
        },
      );

      console.log('JWT_SECRET:', this.configService.get<string>('JWT_SECRET'));

      return {
        user: user,

        token: token,
      };
    } catch (error) {
      // console.log(error)
      throw new InternalServerErrorException('unable to login', error.message);
    }
  }

  // verify user by admin
  async verifyUser(vendorId: number) {
    try {
      // find the user to verify
      const vendoruser = await this.prisma.vendor.findUnique({
        where: {
          id: vendorId,
        },
      });

      if (!vendoruser) {
        throw new BadRequestException('vendor id not found');
      }
      const vendor = await this.prisma.vendor.update({
        where: {
          id: vendorId,
        },
        data: {
          isVerified: true,
        },
      });

      return vendor;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    const user = await this.prisma.vendor.findMany({});
    return { message: 'list of user fecthed', user: user };
  }
}
