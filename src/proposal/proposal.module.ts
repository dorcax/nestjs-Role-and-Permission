import { Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';

@Module({
  controllers: [ProposalController],
  providers: [ProposalService],
})
export class ProposalModule {}
