import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserModule } from '../src/module/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './module/auth/guard/RolesGuard';
import { APP_GUARD } from '@nestjs/core';
import { JobModule } from '../src/module/job/job.module';
import { ProposalModule } from '../src/module/proposal/proposal.module';
import { VendorModule } from '../src/module/vendor/vendor.module';
// import { AuthResolver } from './module/auth/auth.resolver';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from '../src/module/user/user.module';
import 'dotenv/config';

@Module({
  imports: [
    // UserModule,
    ConfigModule.forRoot({
      isGlobal: true, // Ensures .env variables are available globally
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.EXPIRY },
    }),
    JobModule,
    ProposalModule,
    VendorModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    
  ],
  exports: [JwtModule],
})
export class AppModule {}
