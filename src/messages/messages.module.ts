import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';

@Module({
  // controllers - array of controllers that are part of this module
  controllers: [MessagesController],
  // providers - things that can be used as dependencies for other classes
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
