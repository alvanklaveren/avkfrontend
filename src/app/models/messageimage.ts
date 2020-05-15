import { Message } from './message';

export class MessageImage {
    code?: number;
    image: Blob;
    imageHTML: string;
    sortorder: number;
    message: Message;
    version?: number;
  }