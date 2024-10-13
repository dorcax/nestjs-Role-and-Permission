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
  async create(createProposalDto: CreateProposalDto,  jobId: number,vendorId) {
    try {
      // destructure the dto
      const { description, price } = createProposalDto;
        //  Ensure the vendor exists
        const user = await this.prisma.user.findUnique({
          where: { id: vendorId },
          include:{vendor:true}
        });
  
        if (!user) {
          throw new BadRequestException('Vendor not found');
        }
  
        //  Ensure the job exists
        const job = await this.prisma.job.findUnique({
          where: { id: jobId },
        });
  
        if (!job) {
          throw new BadRequestException('Job not found');
        }
  
      const proposal = await this.prisma.proposal.create({
        data: {
          description,
          price,
          job: {
            connect: {
              id: jobId,
            },
          },
          vendor: {
            connect: {
            id:1,
            },
          },
        },
      });
    
      return { message: 'proposal submitted ', proposal };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // verify the proposal

  async verifyProposal(vendorId: number, proposalId: number) {
    try {
      const proposalExist = await this.prisma.proposal.findFirst({
        where: { AND: [{ id: proposalId }, { vendorId: vendorId }] },
      });
      if (!proposalExist) {
        throw new NotFoundException(
          'Proposal not found for the given vendor and proposal ID',
        );
      }
      // update the approval
      const updateApproval = await this.prisma.proposal.update({
        where: { id: proposalId } ,
        data: {
          isApproved: true,
        
        },
      });
      
      
      return { message: 'the proposal has been approved', updateApproval };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
