import { CreatePostAction, 
    FetchPostsRequestAction, 
    FetchPostsSuccessAction, 
    Post } from "@mp/app/post/util";
import { PostApi } from "./post.api";
import { Injectable } from "@nestjs/common";
import { Action, Store } from "@ngxs/store";

@Injectable()
export class PostState{
    constructor(
        private readonly postApi:PostApi,
        private readonly store: Store
    ) {}

    @Action(CreatePostAction)
    async createPost(post:Post){
        const request:Post ={
            id: post.id,
            body: post.body,
            userId: post.userId,
            department:post.department,
            challenge:post.challenge,
            comments:[],
            like:0,
            dislike:0
        };
        
        const results=await this.postApi.createPost(/*request*/);
        //const response=results.data;
        //this.store.dispatch(new FetchPostsSuccessAction(response,"self"));
        console.log(results);
    }

    @Action(FetchPostsSuccessAction)
    async fetchPostsSuccess(posts: Post[],dir:string){
        if(dir=="self"){
            //page.loadPosts(posts);
            console.log("You posts");
        }else{
            //page.loadPosts(posts);
            console.log("Your feed posts");
        }
    }

    @Action(FetchPostsRequestAction)
    async fetchPostsRequest(dir:string){
        let results:any;
        if(dir=="self"){
            results=await this.postApi.ownPosts();
        }else{
            results=await this.postApi.feedPosts();
        }
        this.store.dispatch(new FetchPostsSuccessAction(results,dir));
    }
}