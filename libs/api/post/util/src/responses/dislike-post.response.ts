import { IPost } from '../interfaces';

export interface IDislikePostResponse {
  post:IPost;
  userID?:string | null |undefined;
}
