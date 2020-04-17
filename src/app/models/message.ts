import { MessageCategory } from './messagecategory';
import { ForumUser } from './forumuser';

export class Message {
    code?: number;
    description: string;
    messagetext: string;
    messagedate: Date;
    messagecategory: MessageCategory;
    forumuser: ForumUser;
    message?: Message;
    version?: number;
  }