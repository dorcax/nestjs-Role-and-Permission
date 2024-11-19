import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUsers(searchTerm: string) {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          ...(searchTerm
            ? {
                OR: [
                  {
                    name: {
                      contains: searchTerm,
                      mode: 'insensitive',
                    },
                  },
                  {
                    email: {
                      contains: searchTerm,
                      mode: 'insensitive',
                    },
                  },
                ],
              }
            : {}),
        },
      });
      console.log('userer', users);
      return users;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch users: ${error.message}`);
    }
  }

  // update user

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const { name, email, role } = updateUserDto;
    try {
      // find user id first
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!user) {
        throw new BadRequestException('no user id found');
      }
      const updateUser = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: { email, name, role },
      });
      return updateUser;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  // delete user
  async removeUser(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!user) {
        throw new BadRequestException('no user id found');
      }
      const deleteUser = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return deleteUser;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
