import { IPost } from '../interfaces';

export interface ILikeandDislikeRes{
  Onpost:IPost;
  userID?:string | null |undefined;
}