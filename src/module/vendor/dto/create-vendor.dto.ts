import { IsNotEmpty, IsString ,IsBoolean} from "class-validator"

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

export class VerifyVendorDto {
    @IsBoolean()
    isApproved: boolean;
  }
