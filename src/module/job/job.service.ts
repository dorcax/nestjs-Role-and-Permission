import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateJobDto } from './dto/update-job.dto';

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
  async assignedJob(
    jobId: string,
    vendorId: string,
    proposalId: string,
    assignedJobDto,
  ) {
   try {
    const { isAssigned } = assignedJobDto;
    // find if vendorId exist and approved
    const vendor = await this.prisma.vendor.findUnique({
      where: {
        id: vendorId,
      },
    });

    if (!vendor) {
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

    // find if proposal exist and is approved
    const proposal = await this.prisma.proposal.findUnique({
      where: {
        id: proposalId,
      },
    });
    if (!proposal  || !proposal.isApproved) {
      throw new NotFoundException(
        'proposal id not found   proposal not approved',
      );
    }
    
    // assign job to the vendor
    if (isAssigned) {
      if (job.isAssigned) {
        throw new BadRequestException('Job is already assigned');
      }
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
              id:proposalId,
            },
          },
        },
      });

      // update the job status
      const jobStatus = await this.prisma.job.update({
        where: {
          id: jobId,
        },
        data: {
          isAssigned: isAssigned,
        },
      });
      console.log("kkkssddk",jobStatus)
      return { message: 'job assigned successfully' ,jobStatus};
    } else  {
      if (job.isAssigned){
        const unassigned=  await this.prisma.assignedJob.deleteMany({
          where: {
            jobId: jobId,
            proposalId: proposalId,
            vendorId: vendorId,
          },
        });
const jobStatus=await this.prisma.job.update({
          where: {
            id: jobId,
          },
          data: {
            isAssigned:isAssigned,
          },
        });
       console.log("kkkk",jobStatus)
        return { message: 'Job unassigned successfully',jobStatus };
      }
    
    }
   } catch (error) {
    throw new Error('Failed to : ' + error.message);
   }
  }
 
  // ffind all jobs
  async findAllJobs() {
    try {
      const jobs = await this.prisma.job.findMany({
        include: {
          createdBy: true,
          proposal: true,
          assigned: true,
        },
      });
      return jobs;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // find Job with unique id
  async findJobProposal(jobId: string) {
    try {
      const job = await this.prisma.job.findMany({
        where: {
          id: jobId,
        },
        include: {
          proposal: {
            include: {
              vendor: true, 
            },
          },
        },
      });

      if (!job) {
        throw new Error('Job not found');
      }

      return job;
    } catch (error) {
      throw new Error('Failed to retrieve proposals: ' + error.message);
    }
  }

  // EDIT JOB
  async EditJobs(updateJobDto: UpdateJobDto, jobId) {
    try {
      const { title, description, price } = updateJobDto;
      const job = await this.prisma.job.findUnique({
        where: {
          id: jobId,
        },
      });
      if (!job) {
        throw new NotFoundException('Job not found');
      }
      const updateJob = await this.prisma.job.update({
        where: {
          id: jobId,
        },
        data: {
          title,
          description,
          price,
        },
      });
      return updateJob;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // delete job

  async deleteJob(jobId) {
    try {
      const findJob = await this.prisma.job.findUnique({
        where: {
          id: jobId,
        },
      });
      if (!findJob) {
        throw new NotFoundException('Job not found');
      }
      const deleteJob = await this.prisma.job.delete({
        where: {
          id: jobId,
        },
      });
      return deleteJob;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
