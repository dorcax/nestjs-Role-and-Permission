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
  Query
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto, VerifyVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { RolesGuard } from 'src/module/auth/guard/RolesGuard';
import { AuthGuard } from 'src/module/auth/guard/authguard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/entities/role.enum';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Roles(Role.VENDOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('create')
  create(@Body() createVendorDto: CreateVendorDto, @Req() req) {
    const userId = req.user.sub;
    return this.vendorService.create(createVendorDto, userId);
  }

  // verify user

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':vendorId')
  verifyUser(@Param('vendorId') vendorId: string,@Body() VerifyVendorDto:VerifyVendorDto) {
    // const approvedStatus =isApproved===true
    return this.vendorService.verifyVendor(vendorId,VerifyVendorDto);
  }

  // fetch all vendor 
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Get("vendors")
  getVendors(){
    return this.vendorService.fetchVendors()
  }
  // filter vendor based on approved or pending
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Get("filterVendor")
  filterVendor(@Query("isApproved") isApproved:string,
               @Query("searchTerm") searchTerm:string,
              @Query("sortBy") sortBy:string){
    const approvedStatus =isApproved==="true"
    return this.vendorService.filterVendor(approvedStatus,searchTerm,sortBy)

  }


  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Get(":vendorId")
  fetchVendor(@Param("vendorId") vendorId:string){
    return this.vendorService.fetchVendor(vendorId)

  }
}
