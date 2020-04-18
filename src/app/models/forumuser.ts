import { Classification } from './classification';

export class ForumUser {
    code?: number;
    username: string;
    password: string;
    emailAddress: string;
    displayName: string;
    avatar: Blob;
    classification: Classification;
    version?: number;
  }