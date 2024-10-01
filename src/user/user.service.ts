import { BadRequestException, Body, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(private prisma :PrismaService,
    private readonly jwtService :JwtService,
    private configService:ConfigService

  ){}
 async createUser(createUserDto: CreateUserDto) {
       const {email,password,name} =createUserDto

      //  find user exist 
      const userExist = await this.prisma.user.findUnique({
        where:{
          email
        }
      })
      if(userExist){
        throw new ConflictException("user already exist")
      }

      // create new user 
      const hashPassword =await bcrypt.hash(password,10)
      const user =await this.prisma.user.create({
        data:{
          name,
          email,
          password:hashPassword
        }
      })
    return {message:"user registered successfully",user:{
      id:user.id,
      name:user.name,
      email:user.email,
      role:user.role
    }}
  }






// login in user 

async loginUser(@Body() loginUserDto:LoginUserDto){
  try {
    const{email,password} =loginUserDto

    // find the email

    const user =await this.prisma.user.findUnique({
      where:{
        email:email
      }
    })
    if(!user){
      throw new BadRequestException("invalid credentials")
    }

    // comapre password 
    const isMatch =await bcrypt.compare(password,user.password)
    
    
    if(!isMatch){
      throw new BadRequestException("invalid credential")
    }
    // create token for user
  
    const token =  await this.jwtService.signAsync({sub:user.id},{secret: this.configService.get<string>("JWT_SECRET")})
    



    return {
      user:user,
      token:token
    }
  } catch (error) {
    // console.log(error)
    throw new InternalServerErrorException("unable to login",error.message)
  }

}
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}