import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Only allow requests from this origin
    methods: 'GET,POST,PATCH,DELETE',  // Specify allowed HTTP methods
    credentials: true, 
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
