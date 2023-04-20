import { IPost } from '../interfaces';

export interface ICreateReactionsResponse {
  Onpost:IPost;
  userID?:string | null |undefined;
}
