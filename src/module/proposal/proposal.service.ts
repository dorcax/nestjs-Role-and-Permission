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

  async verifyProposal(vendorId: string, proposalId: string) {
    const proposal = await this.prisma.vendor.findFirst({
      where: {
        id: vendorId,
        isApproved: true,
        proposal: {
          some: {
            id: proposalId,
          },
        },
      },
    });
    if (!proposal) {
      throw new NotFoundException('proposal id not found');
    }
    // update the proposal approval
    const proposalStatus = await this.prisma.proposal.update({
      where: {
        id: proposalId,
      },
      data: {
        isApproved: true,
      },
    });
    return { message: 'proposal approved successfully', proposalStatus };
  }
}
