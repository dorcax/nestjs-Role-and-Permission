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
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { RolesGuard } from 'src/guard/RolesGuard';
import { AuthGuard } from 'src/guard/authguard';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/entities/role.enum';

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
  verifyUser(@Param('vendorId') vendorId: string) {
    return this.vendorService.verifyUser(vendorId);
  }
}
