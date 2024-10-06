import { Controller, Get, Post, Body, Patch, Param, Delete,Req, UseGuards } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/entities/role.enum';
import { AuthGuard } from 'src/guard/authguard';
import { RolesGuard } from 'src/guard/RolesGuard';

@Controller('proposal')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Roles(Role.USER)
  @UseGuards(AuthGuard,RolesGuard)
  @Post("apply/:jobId")
  create(@Param("jobId") jobId:string, @Body() createProposalDto: CreateProposalDto,@Req() req) {
    const vendorId =req.user.sub
    return this.proposalService.create(createProposalDto,vendorId,+jobId);
  }

  // approve the proposal
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Patch("verify/:vendorId/:proposalId")
  verifyProposal(@Param("vendorId") vendorId :string, @Param("proposalId") proposalId :string){

    return this.proposalService.verifyProposal(+vendorId,+proposalId)

  }
  }
