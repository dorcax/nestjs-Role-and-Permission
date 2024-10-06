import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule],
  controllers: [JobController],
  providers: [JobService,PrismaService],
})
export class JobModule {}
