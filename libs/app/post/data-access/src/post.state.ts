import { CreatePost, GetUserID} from "@mp/app/post/util";
import { PostApi } from "./post.api";
import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { Navigate } from "@ngxs/router-plugin";
import { Timestamp } from 'firebase-admin/firestore';
import { Router } from "@angular/router";
import { AuthState } from "@mp/app/auth/data-access";
import { IIPost } from "@mp/api/post/util";
//import { IIPost } from "@mp/api/post/util";

// export interface PostStateModel{
//     Document:{
//         UserId: string | null;
//         Post : [{
//             postId: string | null;
//             contents:{
//                 post: string | null;
//                 challenge: string | null;
//                 department: string | null;
//             };
//             likedProfileIds: [];
//             dislikedProfileIds: [];
//             timestamp?: Timestamp | null;
//         }]
//     };
//   }

@State<IIPost>({
    name:"Post",
    defaults:{
        Document:{
            UserId: "",
            Post : [{
                postId: null,
                contents:{
                    post: null,
                    challenge: null,
                    department: null,
                },
                likedProfileIds: [],
                dislikedProfileIds: [],
                timestamp: null,
            }]
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
    async createPost(ctx:StateContext<IIPost>,{payload}:CreatePost){
        await this.store.dispatch(new GetUserID());
        
        const request:IIPost={
            Document:{
                UserId: this.userId,
                Post : [{
                    postId: "",
                    contents:{
                        post: payload.body,
                        challenge: payload.challenge,
                        department: payload.department,
                    },
                    likedProfileIds: [],
                    dislikedProfileIds: [],
                    timestamp: payload.timestamp,
                }]
            }
        }
        // await this.postApi.createPost(request);
        const response=await this.postApi.createPost(request);

        ctx.setState({...ctx.getState(),Document:response.Document});
        return ctx.dispatch(new Navigate(['home/userprofile']));
    }

    @Action(GetUserID)
  async getUserId() {
    if (!this.userId) {
      this.store
        .select(AuthState.user)
        .subscribe((x: any) => (this.userId = x?.uid));
    }
  }
}