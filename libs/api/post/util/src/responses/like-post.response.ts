import { IPost } from '../interfaces';

export interface ILikePostResponse {
  post:IPost;
  userID?:string | null |undefined;
}
