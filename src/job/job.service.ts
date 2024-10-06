import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma.service';
import { connect } from 'http2';

@Injectable()
export class JobService {
  constructor(private prisma:PrismaService){}
  async createJob(createJobDto: CreateJobDto,adminId) {
    try {
      const {title,description,price} =createJobDto
    
      const job =await this.prisma.job.create({
        data:{
          title,
          description,
          price,
          createdBy:{
            connect:{id:adminId


            }
          }

        }
      })
      return {message:"job created sucessfully",job}
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
    
  }

}