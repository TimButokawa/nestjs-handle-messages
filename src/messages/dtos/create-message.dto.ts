import { IsString } from 'class-validator';

export class CreateMessageDto {
  // The `content` property is a string that represents the content of the message.
  // Content is a required property and must be a string.
  @IsString()
  content: string;
}
