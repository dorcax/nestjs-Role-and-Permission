import { IsNotEmpty, IsString,IsBoolean } from "class-validator"

export class CreateProposalDto {
    @IsString()
    @IsNotEmpty()
    description:string
    @IsString()
    @IsNotEmpty()
    price:number
}
export class ApproveProposalDto {
    @IsBoolean()
    isApproved: boolean;
  }