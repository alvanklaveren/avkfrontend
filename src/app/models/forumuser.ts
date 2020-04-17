import { Classification } from './classification';

export class ForumUser {
    code?: number;
    username: string;
    password: string;
    emailaddress: string;
    displayname: string;
    classification: Classification;
    version?: number;
  }