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
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/entities/role.enum';
import { AuthGuard } from 'src/guard/authguard';
import { RolesGuard } from 'src/guard/RolesGuard';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('create')
  create(@Body() createJobDto: CreateJobDto, @Req() req) {
    const adminId = req.user.sub;
    return this.jobService.createJob(createJobDto, adminId);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('assignJob/:jobId/:vendorId')
  assignJob(
    @Param('jobID') jobId: string,
    @Param('vendorId') vendorId: string,
  ) {
    return this.jobService.assignJobToVendor(+jobId, +vendorId);
  }
}
