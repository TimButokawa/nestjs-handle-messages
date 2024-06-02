import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);

  // This line adds a global validation pipe to the application.
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
