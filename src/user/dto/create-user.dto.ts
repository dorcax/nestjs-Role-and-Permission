import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    prod_name:string
    @IsString()
    @IsNotEmpty()
    password:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    description:string

}
export class LoginUserDto{
    @IsEmail()
    @IsNotEmpty()
    email:string

    
    @IsString()
    @IsNotEmpty()
    password:string
}