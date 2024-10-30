import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports:[JwtModule],
  controllers: [AuthController],
  providers: [AuthService,PrismaService],
})
export class AuthModule {}
