import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma.service';
import { connect } from 'http2';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}
  async createJob(createJobDto: CreateJobDto, adminId) {
    try {
      const { title, description, price } = createJobDto;

      const job = await this.prisma.job.create({
        data: {
          title,
          description,
          price,
          createdBy: {
            connect: { id: adminId },
          },
        },
      });
      if (!job) {
        throw new BadRequestException('an error occurred while creating job');
      }
      return { message: 'job created sucessfully', job };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // assigned job to the vendor
  async assignJobToVendor(jobId: number, vendorId: number) {
    try {
      // find the job
      const job = await this.prisma.job.findUnique({
        where: {
          id: jobId,
        },
      });
      if (!job) {
        throw new BadRequestException('job id not found ');
      }
      // check if job is assigned
      if (job.isAssigned) {
        throw new BadRequestException('Job has already been assigned');
      }
      // assign job to vendor
      const assignedTo = await this.prisma.job.update({
        where: { id: jobId },
        data: {
          assignedToId: vendorId,
          isAssigned: true,
        },
      });
      return assignedTo;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
