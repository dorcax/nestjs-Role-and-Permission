import { IsNotEmpty, IsString } from "class-validator"

export class CreateJobDto {
    @IsString()
    @IsNotEmpty()
    title :string
    @IsString()
    @IsNotEmpty()
    description:string
    @IsString()
    @IsNotEmpty()
    price:number

}
