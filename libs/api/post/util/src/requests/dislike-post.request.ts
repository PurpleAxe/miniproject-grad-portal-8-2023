import { IPost } from '../interfaces';

export interface IDislikePostRequest {
  post:IPost;
  userID?:string | null |undefined;
}
