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
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/entities/role.enum';
import { AuthGuard } from 'src/module/auth/guard/authguard';
import { RolesGuard } from 'src/module/auth/guard/RolesGuard';

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
  @Patch('assignJob/:jobId/:vendorId/:proposalId')
  assignJob(
    @Param('jobId') jobId: string,
    @Param('vendorId') vendorId: string,
    @Param('proposalId') proposalId: string,
  ) {
    return this.jobService.assignedJob(jobId, vendorId, proposalId);
  }


  // find all jobs 
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get("jobs")
  findJobs(){
   return this.jobService.findAllJobs()
  }
  // find job with thier proposal 
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get("proposal/:jobId")
  findJob(@Param("jobId") jobId:string){
   return this.jobService.findJobProposal(jobId)
  }
  // edit job
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch("edit/:jobId")
  EditJob (@Param("jobId") jobId:string,
@Body() updateJobDto:UpdateJobDto){
    return this.jobService.EditJobs(updateJobDto,jobId)
  }
  // delete job
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete("delete/:jobId")
  DeleteJob(@Param("jobId") jobId:string){
    return this.jobService.deleteJob(jobId)
  }
}
