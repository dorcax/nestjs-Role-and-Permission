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
      return { message: ' vendor regisccestered susfully', vendor };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // verify user by admin
  async verifyVendor(vendorId: string,VerifyVendorDto) {
    const{isApproved} =VerifyVendorDto
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
          isApproved:isApproved
        },
      });

      return updatedVendor ;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // fetch all vendor

  async fetchVendors() {
    try {
      const vendor = await this.prisma.vendor.findMany({
        include: {
          proposal: true,
          user: true,
        },
      });
      return  vendor;    
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
 
  // filter vendor  

  async filterVendor(isApproved:boolean,searchTerm:string,sortBy:string){
    try {
      const vendor =await this.prisma.vendor.findMany({
        where:{
          OR:[
            {isApproved},
            {businessName:{
              contains:searchTerm,
              mode:"insensitive"
            }},
         
          ],
          
        }
        // ,
        // orderBy:{
        //     businessName:sortBy
        // }
      })
      return vendor
    } catch (error) {
      throw new InternalServerErrorException(error.messgae)
    }

  }


  // fetch each vendor 
  async fetchVendor(vendorId:string){
    try {
      const vendor =await this.prisma.vendor.findUnique({
        where:{
          id:vendorId
      }
    })
    return {vendor:vendor}
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }

  }
//  statistic for total vendor ,job,user,proposal,assignedJob,approved vendor

async getStatistic(){
  try {
    console.log("Starting getStatistics");

    const totalVendors = await this.prisma.vendor.count();
    console.log("Total Vendors:", totalVendors);

    const totalUsers = await this.prisma.user.count();
    console.log("Total Users:", totalUsers);

    const totalProposals = await this.prisma.proposal.count();
    console.log("Total Proposals:", totalProposals);

    const totalJobs = await this.prisma.job.count();
    console.log("Total Jobs:", totalJobs);

    const assignedJobs = await this.prisma.assignedJob.count();
    console.log("Assigned Jobs:", assignedJobs);

    const approvedVendors = await this.prisma.vendor.count({
      where: { isApproved: true },
    });
    console.log("Approved Vendors:", approvedVendors);

    const pendingVendors = await this.prisma.vendor.count({
      where: { isApproved: false },
    });
    console.log("Pending Vendors:", pendingVendors);

    const vendors = await this.prisma.vendor.findMany({
      select: { isApproved: true },
    });
    console.log("Sample Vendors:", vendors);

    return {
      statistics: {
        totalVendors,
        totalUsers,
        totalProposals,
        totalJobs,
        assignedJobs,
        approvedVendors,
        pendingVendors,
        vendors,
      },
    };
  } catch (error) {
    console.error("Error in getStatistics:", error.message);
    throw new InternalServerErrorException(error.message);
  }
}




}
