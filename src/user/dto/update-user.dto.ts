import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';



enum Role {
    ADMIN="ADMIN",
    VENDOR ="VENDOR"

}
export class UpdateUserDto extends PartialType(CreateUserDto) {
   
  
   @IsString()
   @IsNotEmpty()
    name:string

    @IsEmail()
    @IsNotEmpty()
    email:string

   
    @IsNotEmpty()
    role:Role
}



