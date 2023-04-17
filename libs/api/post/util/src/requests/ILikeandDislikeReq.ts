

import { IPost } from '../interfaces';

export interface ILikeandDislikeReq{
  Onpost:IPost;
  userID?:string | null |undefined;
}