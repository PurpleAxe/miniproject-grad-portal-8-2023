import { CreatePost} from "@mp/app/post/util";
import { PostApi } from "./post.api";
import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store, Selector } from "@ngxs/store";
import { Navigate } from "@ngxs/router-plugin";
import { Timestamp } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { AuthState } from "@mp/app/auth/data-access";
import { IPost, ICreatePostRequest } from "@mp/api/post/util";

export interface PostStateModel{
    Document:{
        posts:{
            model:{
                UserId: string | null;
                Post : IPost | null;
                Message: string | null;
            }
        }
    };
  }

@State<PostStateModel>({
    name:"Post",
    defaults:{
        Document:{
            posts:{
                model:{
                    UserId: null,
                    Post : null,
                    Message: null
                }
            }
        }
    }
})

@Injectable()
export class PostState{
    public userId!: string | null;
    constructor(
        private postApi:PostApi,
        private readonly store: Store
    ) {}
    
    @Action(CreatePost)
    async CreatePost(ctx: StateContext<PostStateModel>, {payload}: CreatePost) {
        const myPost: IPost = {
            postId: null,
            userId: payload.userId,
            message: payload.body,
            challenge: payload.challenge,
            department: payload.department
          };
          const post = myPost;
          const myCreatePostRequest: ICreatePostRequest ={
            post
          }
        console.log("PostId (state):" + payload.body);

        this.postApi.CreatePost(myCreatePostRequest);
    }
  
//     @Action(GetUserID)
//   async getUserId() {
//     if (!this.userId) {
//       this.store
//         .select(AuthState.user)
//         .subscribe((x: any) => (this.userId = x?.uid));
//     }
//   }

  @Selector()
  static getPost(state: PostStateModel) {
    return state.Document.posts.model;
  }
}