import { Timestamp } from 'firebase-admin/firestore';
import { IPost } from '../interfaces';

export interface ICreateCommentRequest {
  Onpost: IPost;
  content?: string|null|undefined;
  userID?: string|null|undefined;
  time?:Timestamp|null|undefined;
}
