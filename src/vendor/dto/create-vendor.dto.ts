import { IsNotEmpty, IsString } from "class-validator"

export class CreateVendorDto {
    @IsNotEmpty()
    @IsString()
    businessName:string

    @IsNotEmpty()
    @IsString()
    description:string

    @IsNotEmpty()
    @IsString()
    businessAddress:string
}
