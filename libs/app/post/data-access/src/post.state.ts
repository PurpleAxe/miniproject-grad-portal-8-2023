import { CreatePostAction } from "@mp/app/post/util";
import { PostApi } from "./post.api";
import { Injectable } from "@angular/core";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { Navigate } from "@ngxs/router-plugin";
import { Timestamp } from 'firebase-admin/firestore';
//import { IIPost } from "@mp/api/post/util";

export interface PostStateModel{
    Document:{
        UserId: string | null;
        Post : [{
            postId: string | null;
            contents:{
                post: string | null;
                challenge: string | null;
                department: string | null;
            };
            likedProfileIds: [];
            dislikedProfileIds: [];
            timestamp?: Timestamp | null;
        }]
    };
  }

@State<PostStateModel>({
    name:"Post",
    defaults:{
        Document:{
            UserId: null,
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
    constructor(
        private postApi:PostApi,
    ) {}
    
    @Action(CreatePostAction)
    async createPost(ctx:StateContext<PostStateModel>,{payload}:CreatePostAction){

        const request:PostStateModel={
            Document:{
                UserId: "",
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
        this.postApi.createPost(request);
        // const response=await this.postApi.createPost(/*request*/);
        //const state=ctx.getState();
        //ctx.setState({...state,response});
        ctx.dispatch(new Navigate(['Feed']));
    }
}