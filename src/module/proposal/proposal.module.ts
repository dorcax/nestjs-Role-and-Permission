import { Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports:[JwtModule],
  controllers: [ProposalController],
  providers: [ProposalService,PrismaService],
})
export class ProposalModule {}
