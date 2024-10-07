import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VendorController],
  providers: [VendorService,PrismaService],
})
export class VendorModule {}
