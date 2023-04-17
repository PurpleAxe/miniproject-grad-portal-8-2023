import { Timestamp } from 'firebase-admin/firestore';
import { IPost } from '../interfaces';

export interface ICommentAdd{
  Onpost: IPost;
  content: string;
  userID: string;
  time:Timestamp;
}