

import { IPost } from '../interfaces';

export interface ICreateReactionRequest {
  Onpost:IPost;
  userID?:string | null |undefined;
}
