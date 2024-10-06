import { Injectable ,BadRequestException} from '@nestjs/common';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProposalService {
  constructor(private prisma:PrismaService){}
  async create(createProposalDto: CreateProposalDto,vendorId ,jobId:number) {
    // destructure the dto
    const{description,price} =createProposalDto
    const proposal =await this.prisma.proposal.create({
      data:{
        description,
        price,
        job:{
          connect:{
            id:jobId
          }
        },
        vendor:{
          connect:{
            id:vendorId
          }
        }
      }

    })
    return {message:"proposal submitted ",proposal};
  }


  // verify the proposal

  async verifyProposal(vendorId:number,proposalId:number){

    
      // update the approval
      const updateApprova =await this.prisma.proposal.updateMany({
        where:{AND:[{id:proposalId},{vendorId:vendorId}
       
        ]},
        data:{
          isApproved:true
        }
      })
      return{message:"the proposal has been approved",updateApprova}
  }

}