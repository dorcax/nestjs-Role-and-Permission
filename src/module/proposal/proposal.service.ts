import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProposalService {
  constructor(private prisma: PrismaService) {}
  async createProposal(
    createProposalDto: CreateProposalDto,
    jobId: string,
    vendorId: string,
  ) {
    const { description, price } = createProposalDto;
    // find if the vendor exist
    const vendor = await this.prisma.vendor.findUnique({
      where: {
        id: vendorId,
      },
    });
    if (!vendor || !vendor.isApproved) {
      throw new NotFoundException('vendor id not found or not approved');
    }

    const job = await this.prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });
    if (!job) {
      throw new NotFoundException('job id not found ');
    }
    if (job.isAssigned) {
      throw new BadRequestException('job has already beene  assigned');
    }

    // create a proposal
    const proposal = await this.prisma.proposal.create({
      data: {
        description,
        price,
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
      },
    });
    return { messsage: 'proposal create successfully', proposal };
  }

  
  async verifyProposal(vendorId: string, proposalId: string, approveProposalDto) {
    try {
        const { isApproved } = approveProposalDto;

        // Find the proposal to check its current status
        const proposal = await this.prisma.proposal.findUnique({
            where: {
                id: proposalId,
            },
        });

        if (!proposal) {
            throw new NotFoundException('Proposal not found');
        }

        // Check if the vendor is approved
        const vendor = await this.prisma.vendor.findMany({
            where: {
                id: vendorId,
                isApproved: true,
            },
        });

        if (!vendor) {
            throw new NotFoundException('Vendor not found or not approved for the proposal');
        }

        // Update the proposal approval status
        const proposalStatus = await this.prisma.proposal.update({
            where: {
                id: proposalId,
            },
            data: {
                isApproved,
            },
            include:{
              job:true,
              vendor:true
            }
        });

        return proposalStatus;

    } catch (error) {
        throw new InternalServerErrorException(error.message);
    }
}


  // find many proposal
  async findJobProposals(jobId:string) {
    try {
      const proposals = await this.prisma.proposal.findMany({
        where:{
          jobId:jobId
        },
        include:{
          vendor:true,
          job:true,
          assigned:true
        }
      });
      return proposals;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }


  // find many proposal
  async findProposals() {
    try {
      const proposals = await this.prisma.proposal.findMany({
        include:{
          vendor:true,
          job:true,
          assigned:true
        }
      });
      return proposals;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

