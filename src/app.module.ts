// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';




// @Module({
//   imports: [UserModule,
//      // This makes ConfigModule available globally in your app
//   ConfigModule.forRoot({
//     isGlobal:true
//   }),
//    // Configure JwtModule using ConfigModule for the secret and expiry
//   JwtModule.registerAsync({
//     // Ensure ConfigModule is available
//     imports: [ConfigModule],
//     useFactory:async(configService: ConfigService)=>({
      
//       // secret: configService.get<string>("JWT_SECRET"),
//       secret: "MYNEWROLEANDPERMISSION",
//       signOptions:{ expiresIn:configService.get<string>("EXPIRY")}
//     }),
//     // Inject ConfigService to access the environment variables

//     inject:[ConfigService]
//   })
  
   
//   ],
//   controllers: [AppController],
//   providers: [AppService],
//   exports:[JwtModule]
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    // This makes ConfigModule available globally in your app
    ConfigModule.forRoot({
      isGlobal: true,  // Makes ConfigModule available globally
    }),
    // Configure JwtModule using ConfigModule for the secret and expiry
    JwtModule.registerAsync({
      // Ensure ConfigModule is available
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // Get the secret from the environment variable
        secret: configService.get<string>("JWT_SECRET"),  // Uncomment this line
        signOptions: { expiresIn: configService.get<string>("EXPIRY") }, // Get expiration time
      }),

      
      // Inject ConfigService to access the environment variables
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule],
})
export class AppModule {}
