import { MessagesRepository } from './messages.repository';

export class MessagesService {
  messagesRepository: MessagesRepository;

  constructor() {
    // TODO: remove this - this service depends on the MessagesRepository class
    // DO NOT DO THIS IN A REAL APPLICATION, USE DEPENDENCY INJECTION
    this.messagesRepository = new MessagesRepository();
  }

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
