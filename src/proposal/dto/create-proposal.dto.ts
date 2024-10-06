import { IsNotEmpty, IsString } from "class-validator"

export class CreateProposalDto {
    @IsString()
    @IsNotEmpty()
    description:string
    @IsString()
    @IsNotEmpty()
    price:number
}
