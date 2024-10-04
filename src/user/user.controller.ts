import { Controller, Get, Post, Body, Patch, Param, Delete,SetMetadata ,UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
 import {Role} from "./entities/role.enum"
 import{AuthGuard} from "../guard/authguard"
 import {Roles} from "./decorator/roles.decorator"
import { RolesGuard } from '../guard/RolesGuard';
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


  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)  // Both AuthGuard and RolesGuard
  @Get('allusers')
  findAll() {
      return this.userService.findAll();
  }
  

  @Get(':id')
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
