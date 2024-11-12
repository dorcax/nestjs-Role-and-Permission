import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateJobDto {
    @IsString()
    @IsNotEmpty()
    title :string
    @IsString()
    @IsNotEmpty()
    description:string
    @IsNumber()
    @IsNotEmpty()
    price:number

}
