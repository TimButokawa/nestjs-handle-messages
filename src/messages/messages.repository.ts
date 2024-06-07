import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

/**
 * Repository for managing messages.
 *
 * This repository reads and writes messages to a JSON file.
 *
 * methods:
 * - `findOne(id: string): Promise<{ id: string, content: string }>`
 * - `findAll(): Promise<{ id: { id: string, content: string } }>`
 * - `create(content: string): Promise<{ id: string, content: string }>`
 */
// @Injectable - Decorates a class that can be managed by the Nest IoC container.
@Injectable()
export class MessagesRepository {
  /**
   * Reads the messages.json file and returns the message with the given id.
   *
   * @param id - string - the id of the message
   * @returns
   * ```json
   * {
   *   "id": "string",
   *   "content": "string"
   * }
   * ```
   */
  async findOne(id: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    return messages[id];
  }

  /**
   * Reads the messages.json file and returns all messages.
   *
   * @returns
   * ```json
   * {
   *   "id": {
   *     "id": "string",
   *     "content": "string"
   *   }
   * }
   * ```
   */
  async findAll() {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    return messages;
  }

  /**
   * Creates a new message in the messages.json file.
   *
   * - Randomly generates an id for the message
   * - Saves it to the messages.json file.
   *
   * @param content - string - the message content
   * @returns
   * ```json
   * {
   *   "id": "string",
   *   "content": "string"
   * }
   * ```
   */
  async create(content: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };

    await writeFile('messages.json', JSON.stringify(messages, null, 2));

    return messages[id];
  }
}
