import { IsNotEmpty, IsString } from "class-validator"

export class CreateVendorDto {
    @IsNotEmpty()
    @IsString()
    bussiness_name:string

    @IsNotEmpty()
    @IsString()
    description:string

    @IsNotEmpty()
    @IsString()
    bussiness_address:string
}
