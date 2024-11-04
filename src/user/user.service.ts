import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma:PrismaService

  ){}


  async findUsers(searchTerm:string) {
    try {
      const users =await this.prisma.user.findMany({
        where:{
          ...(searchTerm?{
            OR:[{
              name:{
                contains:searchTerm,
                mode:"insensitive"
              }},
              {email:{
                contains:searchTerm,
                mode:"insensitive"
              }},
             
            ]
          }:{})
         
        }
      })
      console.log("userer",users)
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
   
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const{name,email,role} =updateUserDto
try {
  const updateUser =await this.prisma.user.update({
    where:{
      id:id
    },
    data:{email,name,role

    }
  })
  return updateUser
} catch (error) {
   throw new NotFoundException(`User with ID ${id} not found`)
}
  }

  async removeUser(id:string) {
try {
  const deleteUser =await this.prisma.user.delete({
    where:{
      id:id
    }
  })
  return deleteUser
} catch (error) {
  throw new NotFoundException(`User with ID ${id} not found`)
}
  }
}
