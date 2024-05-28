import { Body, Controller, Get, Param, Post } from '@nestjs/common';

/**
 * The `@Controller` decorator is used to define a new controller class.
 * The `@Get` and `@Post` decorators are used to define the HTTP request methods that the controller will handle.
 *
 * "messages" is the route prefix for the controller.
 */
@Controller('messages')
export class MessagesController {
  // listMessages() is the method that will be called when a GET request is made to the /messages route.
  @Get()
  listMessages() {
    return 'Hello World!';
  }

  // createMessage() is the method that will be called when a POST request is made to the /messages route.
  @Post()
  // The `@Body` decorator is used to extract the body of the request.
  createMessage(@Body() body: any) {
    console.log('body', body);
    return 'Create not implemented';
  }

  // getMessage() is the method that will be called when a GET request is made to the /messages/:id route.
  @Get(':id')
  // The `@Param` decorator is used to extract the value of a route parameter.
  getMessage(@Param('id') id: string) {
    console.log('id', id);
    return 'By ID not implemented';
  }
}
