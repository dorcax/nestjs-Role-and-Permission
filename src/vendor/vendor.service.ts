import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VendorService {
  constructor(private prisma: PrismaService) {}
  async create(createVendorDto: CreateVendorDto, userId: string) {
    try {
      const { businessAddress, businessName, description } = createVendorDto;
      const vendor = await this.prisma.vendor.create({
        data: {
          businessAddress,
          businessName,
          description,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return { message: ' vendor registered successfully', vendor };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // verify user by admin
  async verifyUser(vendorId: string) {
    try {
      // find the user to verify
      const vendor = await this.prisma.vendor.findUnique({
        where: {
          id: vendorId,
        },
      });

      if (!vendor) {
        throw new BadRequestException('vendor id not found');
      }
      const updatedVendor = await this.prisma.vendor.update({
        where: {
          id: vendorId,
        },
        data: {
          isApproved: true,
        },
      });

      return { vendor: updatedVendor };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
