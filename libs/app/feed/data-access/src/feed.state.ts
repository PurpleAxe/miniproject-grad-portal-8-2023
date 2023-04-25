import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext, Selector, Store } from '@ngxs/store';
import { 
    /*LoadFeed,*/
    LikePost,
    DislikePost,
    FetchHomeFeed,
    FetchDiscoveryFeed,
 } from '@mp/app/feed/util';
import { FeedApi } from './feed.api';
import { Timestamp } from 'firebase-admin/firestore';
import { IIFeed } from '@mp/api/feed/util';
import {
  IPost, 
  ILikePostResponse,
  IDislikePostResponse
} from '@mp/api/post/util';

export interface FeedStateModel{

  feed:{
    model:{
      users: any[] | null;
    };
    dirty: false;
    status: string;
    errors: object;
  },
  feedPosts: IPost[];      /*****ADDED FEED POST FIELD ON THE STATE MODEL INTERFACE*****/
}

@State<FeedStateModel>({
    name: 'feed',
    defaults: {
      feed:{
        model:{
          users: null,
        },
        dirty: false,
        status: '',
        errors: {}
      },
      feedPosts: [],  
    }
})
@Injectable()
export class FeedState {
    constructor(
      private readonly feedApi: FeedApi,
      private readonly store: Store
    ) {}

    @Action(LikePost)
    async LikePost(ctx: StateContext<FeedStateModel>, {payload}: LikePost) {
      const myPost: IPost = {
        postId: payload.postId,
        userId: payload.userId,
      };
      const post = myPost;
      const myLikePostResponse: ILikePostResponse ={
        post
      }
      console.log("PostId (state):" + payload.postId);
      this.feedApi.LikePost(myLikePostResponse);
  }

  @Action(DislikePost)
  async DislikePost(ctx: StateContext<FeedStateModel>, {payload}: DislikePost) {
    const myPost: IPost = {
      postId: payload.postId,
      userId: payload.userId,
    };
    const post = myPost;
    const myDislikePostResponse: IDislikePostResponse ={
      post
    }
    console.log("PostId (state) dislike:" + payload.postId);
    this.feedApi.DislikePost(myDislikePostResponse);
}

  @Selector()
  static messages(state: FeedStateModel) 
  {
    return state.feed.model;
  }

  @Selector()
    static getFeedPosts(FeedStateModel:FeedStateModel){ 
        return FeedStateModel.feedPosts;
    }



    /*************FETCH HOME FEED*************/
  // @Action(FetchHomeFeed)//dont know how
  // async FetchHomeFeed(ctx: StateContext<FeedStateModel>) {
  //   // const response = await this.feedApi.fetchHomeFeed();
  //   // const state=ctx.getState()
  //   // ctx.setState({...state,
  //   //   feedPosts:response
  //   // });

  //   }


       /*************FETCH DISCOVERY FEED*************/
  // @Action(FetchDiscoveryFeed)//dont know how
  // async FetchDiscoveryFeed(ctx: StateContext<FeedStateModel>) {
  //   // const response = await this.feedApi.fetchDiscoveryFeed();
  //   // ctx.patchState({
  //   //   feedPosts:response
  //   // });

  //   }
}