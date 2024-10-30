import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/entities/role.enum';
import { AuthGuard } from 'src/module/auth/guard/authguard';
import { RolesGuard } from 'src/module/auth/guard/RolesGuard';

@Controller('proposal')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Roles(Role.VENDOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('apply/:vendorId/:jobId')
  create(
    @Param('vendorId') vendorId: string,
    @Param('jobId') jobId: string,
    @Body() createProposalDto: CreateProposalDto,
  ) {
    return this.proposalService.createProposal(
      createProposalDto,
      jobId,
      vendorId,
    );
  }

  // approve the proposal
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('verify/:vendorId/:proposalId')
  verifyProposal(
    @Param('vendorId') vendorId: string,
    @Param('proposalId') proposalId: string,
  ) {
    return this.proposalService.verifyProposal(vendorId, proposalId);
  }
}
