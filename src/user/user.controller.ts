import { Controller, Get, Post, Body, Patch, Param, Delete,SetMetadata ,UseGuards,Req} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
 import {Role} from "./entities/role.enum"
 import{AuthGuard} from "../guard/authguard"
 import {Roles} from "./decorator/roles.decorator"
import { RolesGuard } from '../guard/RolesGuard';
import { request } from 'http';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post("login")
  // @SetMetadata("roles",[Role.ADMIN])

  login(@Body() loginUserDto:LoginUserDto){
    return this.userService.loginUser(loginUserDto)
  }


  // verify user
  
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Patch(":id")
  verifyUser(@Param("id") id:string){
     return this.userService.verifyUser(+id)

  }
  
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)  // Both AuthGuard and RolesGuard
  @Get('allvendors')
  findAll() {
      return this.userService.findAll();
  }

  
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
