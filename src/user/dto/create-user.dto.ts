import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    
}
export class LoginUserDto{
    @IsEmail()
    @IsNotEmpty()
    email:string

    
    @IsString()
    @IsNotEmpty()
    password:string
}