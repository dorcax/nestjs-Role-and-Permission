/*
  Warnings:

  - The primary key for the `Job` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Proposal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bussiness_address` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `bussiness_name` on the `Vendor` table. All the data in the column will be lost.
  - The required column `id` was added to the `AssignedJob` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `businessAddress` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessName` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Vendor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "AssignedJob" DROP CONSTRAINT "AssignedJob_jobId_fkey";

-- DropForeignKey
ALTER TABLE "AssignedJob" DROP CONSTRAINT "AssignedJob_proposalId_fkey";

-- DropForeignKey
ALTER TABLE "AssignedJob" DROP CONSTRAINT "AssignedJob_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_userId_fkey";

-- AlterTable
ALTER TABLE "AssignedJob" ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "vendorId" SET DATA TYPE TEXT,
ALTER COLUMN "proposalId" SET DATA TYPE TEXT,
ALTER COLUMN "jobId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AssignedJob_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Job" DROP CONSTRAINT "Job_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "createdById" SET DATA TYPE TEXT,
ADD CONSTRAINT "Job_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Job_id_seq";

-- AlterTable
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "vendorId" SET DATA TYPE TEXT,
ALTER COLUMN "jobId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Proposal_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "bussiness_address",
DROP COLUMN "bussiness_name",
ADD COLUMN     "businessAddress" TEXT NOT NULL,
ADD COLUMN     "businessName" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedJob" ADD CONSTRAINT "AssignedJob_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedJob" ADD CONSTRAINT "AssignedJob_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedJob" ADD CONSTRAINT "AssignedJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
