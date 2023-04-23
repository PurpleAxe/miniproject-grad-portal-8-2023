import { CreatePostAction } from "@mp/app/post/util";
import { PostApi } from "./post.api";
import { Injectable } from "@nestjs/common";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { Navigate } from "@ngxs/router-plugin";
import { IPost } from "@mp/api/post/util";


@State<IPost>({
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
        private readonly postApi:PostApi,
        private readonly store: Store
    ) {}

    @Action(CreatePostAction)
    async createPost(ctx:StateContext<IPost>,action:CreatePostAction){

        const request:IPost={
            Document:{
                UserId: "",
                Post : [{
                    postId: "",
                    contents:{
                        post: action.payload.body,
                        challenge: action.payload.challenge,
                        department: action.payload.department,
                    },
                    likedProfileIds: [],
                    dislikedProfileIds: [],
                    timestamp: action.payload.timestamp,
                }]
            }
        }
        this.postApi.createPost(request);
        // const response=await this.postApi.createPost(/*request*/);
        // const state=ctx.getState();
        // ctx.setState({...state,response});
        this.store.dispatch(new Navigate(['Feed']));
    }
}