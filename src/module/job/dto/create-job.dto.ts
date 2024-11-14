import { IsNotEmpty, IsNumber, IsString,IsBoolean } from "class-validator"

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
export class AssignedJobDto {
    @IsBoolean()
    isAssigned: boolean;
  }
