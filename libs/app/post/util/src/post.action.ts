//Post interface Will be imported from the backend
export interface Post {
  id?: number;
  title?: string;
  body?: string;
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

export class FetchPostsRequestAction {
    static readonly type=PostActionTypes.FETCH_POSTS_REQUEST;
}
  
export class FetchPostsSuccessAction {
 static readonly type=PostActionTypes.FETCH_POSTS_SUCCESS;
 constructor(payload: Array<Post>) {/**/}
}

export class FetchPostsFailureAction {
 static readonly type=PostActionTypes.FETCH_POSTS_FAILURE;
 constructor(payload: string) {/**/}
}

export class CreatePostRequestAction {
 static readonly type=PostActionTypes.CREATE_POST_REQUEST;
}

export class CreatePostSuccessAction {
 static readonly type=PostActionTypes.CREATE_POST_SUCCESS;
 constructor(payload: Post) {/**/}
}

export class CreatePostFailureAction {
 static readonly type=PostActionTypes.CREATE_POST_FAILURE;
 constructor(payload: string) {/**/}
}

export type PostAction =
| FetchPostsRequestAction
| FetchPostsSuccessAction
| FetchPostsFailureAction
| CreatePostRequestAction
| CreatePostSuccessAction
| CreatePostFailureAction;

// import { Component } from '@angular/core';


// interface Post {
//   id?: number;
//   title?: string;
//   body?: string;
// }

// interface PostState {
//   posts: Array<Post>;
//   isLoading: boolean;
//   error: string | null;
// }

// @Component({
//   selector: 'app-post',
//   templateUrl: './post.page.html',
//   styleUrls: ['./post.page.scss'],
// })
// export class PostPageComponent {
//   posts:Array<Post>=[];
//   newPost: Post={};
//   isLoading=false;
//   error="";
//   // Define the post interface
//   constructor(){
//     this.generate();
//   }
  
//   generate(){
//     for(let i=0;i<5;i++){
//       this.posts[i]={
//         id:i,
//         title: "POST TITLE"+i,
//         body: "Post body here....Post body here...Post body here..."
//       }
//     }
//   }

//   createPost(){
//     //
//     this.newPost.id=this.posts.length;
//     this.posts.push(this.newPost);
//     this.newPost.title="";
//     this.newPost.body="";
//   }
// }




