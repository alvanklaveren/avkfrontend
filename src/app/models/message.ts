import { MessageCategory } from './messagecategory';
import { ForumUser } from './forumuser';

export class Message {
    code?: number;
    description: string;
    messageText: string;
    messageDate: Date;
    messageCategory: MessageCategory;
    forumUser: ForumUser;
    message?: Message;
    version?: number;

    preparedMessageText: string;
  }