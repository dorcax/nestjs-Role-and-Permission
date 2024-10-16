import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}
  async createJob(createJobDto: CreateJobDto, adminId: string) {
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

      return { message: 'job created sucessfully', job };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // ASSIGNED JOB
  async assignedJob(jobId: string, vendorId: string, proposalId: string) {
    // find if vendorId exist and approved
    const vendor = await this.prisma.vendor.findUnique({
      where: {
        id: vendorId,
      },
    });
    if (!vendor || !vendor.isApproved) {
      throw new NotFoundException('vendor is either not approved or not found');
    }
    // find if job exist and is not assigned
    const job = await this.prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });
    if (!job) {
      throw new NotFoundException('job id not found');
    }
    if (job.isAssigned) {
      throw new BadRequestException('job is already assigned');
    }
    // find if proposal exist and is approved
    const proposal = await this.prisma.proposal.findUnique({
      where: {
        id: proposalId,
      },
    });
    if (!proposal || !proposal.isApproved) {
      throw new NotFoundException(
        'proposal id not found   proposal not approved',
      );
    }
    // assign job to the vendor

    const assignJob = await this.prisma.assignedJob.create({
      data: {
        vendor: {
          connect: {
            id: vendorId,
          },
        },
        job: {
          connect: {
            id: jobId,
          },
        },
        proposal: {
          connect: {
            id: proposalId,
          },
        },
      },
    });

    // update the job status
    const jobStatus =await this.prisma.job.update({
      where:{
        id:jobId
      },
      data:{
        isAssigned:true
      }
    })
    return {message:"job assigned successfully",assignJob}
  }
}
