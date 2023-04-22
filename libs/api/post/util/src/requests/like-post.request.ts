

import { IPost } from '../interfaces';

export interface ILikePostRequest {
  post:IPost;
  userID?:string | null |undefined;
}
