import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty({message:"name is required"})
    name:string

    @IsEmail({},{message:"enter a valid email"})
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty({message:"password is required"})
    password:string
}

export class LoginUserDto{
    @IsEmail({},{message:"enter a valid email"})
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty({message:"password is required"})
    password:string
}