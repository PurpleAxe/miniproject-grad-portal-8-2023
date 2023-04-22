import { IPost } from '../interfaces';

export interface ILikePostResponse {
  Onpost:IPost;
  userID?:string | null |undefined;
}
