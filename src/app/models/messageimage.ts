import { Message } from './message';

export class MessageImage {
    code?: number;
    image: Blob;
    sortorder: number;
    message: Message;
    version?: number;
  }