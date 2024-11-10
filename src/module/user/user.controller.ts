import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/module/auth/entities/role.enum';
import { Roles } from 'src/module/auth/decorator/roles.decorator';
import { AuthGuard } from 'src/module/auth/guard/authguard';
import { RolesGuard } from 'src/module/auth/guard/RolesGuard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

 
   @Roles(Role.ADMIN)
   @UseGuards(AuthGuard,RolesGuard)
  @Get("allusers")
  findAll(@Query("searchTerm") searchTerm:string
  ) {
    return this.userService.findUsers(searchTerm);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }
@Roles(Role.ADMIN)
@UseGuards(AuthGuard,RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }


@Roles(Role.ADMIN)
@UseGuards(AuthGuard,RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
