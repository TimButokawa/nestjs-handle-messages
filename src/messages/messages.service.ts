import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

// @Injectable - Decorates a class that can be managed by the Nest IoC container.
@Injectable()
export class MessagesService {
  /**
   * Creates an instance of MessagesService.
   *
   * @param messagesRepository - MessagesRepository - the repository for managing messages
   */
  constructor(public messagesRepository: MessagesRepository) {}

  /**
   * Uses the MessagesRepository to find a message by id.
   *
   * @param id - string - the id of the message
   * @returns MessageRepository.findOne(id)
   */
  async findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  /**
   * Uses the MessagesRepository to find all messages.
   *
   * @returns MessageRepository.findAll()
   */
  async findAll() {
    return this.messagesRepository.findAll();
  }

  /**
   * Uses the MessagesRepository to create a new message.
   *
   * @param content - string - the message content
   * @returns MessageRepository.create(content)
   */
  async create(content: string) {
    return this.messagesRepository.create(content);
  }
}
