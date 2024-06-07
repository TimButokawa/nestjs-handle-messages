import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

/**
 * The `@Controller` decorator is used to define a new controller class.
 * The `@Get` and `@Post` decorators are used to define the HTTP request methods that the controller will handle.
 *
 * "messages" is the route prefix for the controller.
 */
@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  // listMessages() is the method that will be called when a GET request is made to the /messages route.
  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  // createMessage() is the method that will be called when a POST request is made to the /messages route.
  @Post()
  // The `@Body` decorator is used to extract the body of the request.
  // The `CreateMessageDto` class is used to validate the body of the request.
  createMessage(@Body() body: CreateMessageDto) {
    console.log('body', body);
    return this.messagesService.create(body.content);
  }

  // getMessage() is the method that will be called when a GET request is made to the /messages/:id route.
  @Get(':id')
  // The `@Param` decorator is used to extract the value of a route parameter.
  async getMessage(@Param('id') id: string) {
    console.log('id', id);
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }
}
