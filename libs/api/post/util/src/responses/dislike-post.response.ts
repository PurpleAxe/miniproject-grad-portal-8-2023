import { IPost } from '../interfaces';

export interface IDislikePostResponse {
  Onpost:IPost;
  userID?:string | null |undefined;
}
