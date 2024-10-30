import { ConflictException, Injectable ,InternalServerErrorException,BadRequestException} from '@nestjs/common';
import { CreateAuthDto ,LoginUserDto} from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from "bcrypt"
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma:PrismaService,
              private configService:ConfigService,
              private readonly jwtService:JwtService
  ){}
  async createUser(createAuthDto: CreateAuthDto) {
    try {
      const{name,email,password} =createAuthDto 

    // find is user  exist
    const user =await this.prisma.user.findUnique({
      where:{
        email:email
      }
    })
    if(user){
      throw new ConflictException("user already exist")
    }
    //  create new user

    const newUser =await this.prisma.user.create({
      data:{
        name,
        email,
        password:await bcrypt.hash(password,10)
      }
    })
    return {
      message: 'user registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    
    
  }
       // login in user

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;

      // find the email

      const user = await this.prisma.user.findUnique({
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
      const token = await this.jwtService.signAsync(
        { sub: user.id, role: user.role },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: this.configService.get<string>('EXPIRY'),
        },
      );

      console.log('JWT_SECRET:', this.configService.get<string>('JWT_SECRET'));

      return {
        message:"user logged in",
        user: user,

        token: token,
      };
    } catch (error) {
      // console.log(error)
      throw new InternalServerErrorException('unable to login', error.message);
    }
  }




}
