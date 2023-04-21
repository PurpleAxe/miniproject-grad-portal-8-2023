import { Injectable } from "@nestjs/common";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { IPost } from "@mp/api/post/util";
import { FetchHomeFeedAction, LoadHomeFeedAction } from "@mp/app/feed/util";
import { FeedApi } from "./feed.api";
import { Timestamp } from "firebase-admin/firestore";

export interface IFeed{
    Post:{
        UserId: string | null;
        Post : {
            postId: string | null;
            contents:{
                post: string | null;
                challenge: string | null;
                department: string | null;
            },
            likedProfileIds: [];
            dislikedProfileIds: [];
            timestamp: Timestamp | null;
        }
    }
}

export interface IFeedStateModel{
    feedPosts: IFeed[];
}

@State<IFeedStateModel>({
    name:"Post",
    defaults:{
        feedPosts: []
    }
})

@Injectable()
export class FeedState{
    constructor(
        private readonly feedApi:FeedApi,
        private readonly store: Store
    ) {}

    @Action(FetchHomeFeedAction)
    async fetchFeed(){
       const response = await this.feedApi.fetchHomeFeed();
      this.store.dispatch(new LoadHomeFeedAction(response))
    }

    @Action(LoadHomeFeedAction)
    async loadFeed(ctx:StateContext<IFeedStateModel>,action:LoadHomeFeedAction){
       const state = ctx.getState();
       ctx.setState({...state,feedPosts:action.payload})
    }

    @Selector()
    static getFeedPosts(FeedStateModel:IFeedStateModel){
        return FeedStateModel.feedPosts;
    }
}