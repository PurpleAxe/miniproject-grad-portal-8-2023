//Post interface Will be imported from the backend

import { Timestamp } from "firebase-admin/firestore";

// export type Page = FeedPage | ProfilePage;

 export interface MyPayload {
     body: string;
     department:string;
     challenge:string;
     timestamp?:Timestamp;
   }

// Action interfaces
export enum PostActionTypes {
    FETCH_POSTS_REQUEST = "[post] FETCH_POSTS_REQUEST",
    FETCH_POSTS_SUCCESS = "[post] FETCH_POSTS_SUCCESS",
    FETCH_POSTS_FAILURE = "[post] FETCH_POSTS_FAILURE",
    CREATE_POST_REQUEST = "[post] CREATE_POST_REQUEST",
    CREATE_POST_SUCCESS = "[post] CREATE_POST_SUCCESS",
    CREATE_POST_FAILURE = "[post] CREATE_POST_FAILURE",
  }

export class CreatePostsFailureAction {
  static readonly type=PostActionTypes.FETCH_POSTS_REQUEST;
  constructor(public dir: string) {/**/}

}
  
export class CreatePostsSuccessAction {
 static readonly type=PostActionTypes.FETCH_POSTS_SUCCESS;
 constructor(public payload: Array<MyPayload>,public dir:string) {/**/}
}



export class CreatePostAction {
  static readonly type=PostActionTypes.CREATE_POST_SUCCESS;
  constructor(public payload: MyPayload) {/**/}
 }




