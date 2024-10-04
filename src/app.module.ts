import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {RolesGuard} from "./guard/RolesGuard"
import {APP_GUARD} from "@nestjs/core"
import 'dotenv/config';



@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,  // Ensures .env variables are available globally
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET ,
      signOptions: { expiresIn: process.env.EXPIRY },
    }),
  ],
  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide:APP_GUARD,
    //   useClass:RolesGuard,
    // },
  ],
  exports: [JwtModule],
})


export class AppModule {}

