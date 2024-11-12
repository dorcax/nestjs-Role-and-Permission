import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateJobDto extends PartialType(CreateJobDto) {
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
