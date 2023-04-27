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
    FetchOwnPosts
 } from '@mp/app/feed/util';
import { FeedApi } from './feed.api';
import {IPost, ILikePostResponse, IComment, IDislikePostResponse} from '@mp/api/post/util';
import { Timestamp } from '@angular/fire/firestore';
//import { Timestamp } from 'firebase-admin/firestore';
import { IFeed, IGetDiscoveryFeedRequest, IGetHomeFeedRequest, IGetOwnFeedRequest } from '@mp/api/feed/util';
import { request } from 'http';

export interface FeedStateModel{

  feed:{
    model:{
      users: any[] | null;
      feedPosts: IFeed | null;
      postComments: IComment[] | null;
    };
    dirty: false;
    status: string;
    errors: object;
  }
}

@State<FeedStateModel>({
    name: 'feed',
    defaults: {
      feed:{
        model:{
          users: null,
          feedPosts:null,
          postComments: null
        },
        dirty: false,
        status: '',
        errors: {}
      },
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
  static messages(state: FeedStateModel) {
    return state.feed.model;
    //return null;
  }

  @Selector()
  static getFeedPosts(FeedStateModel:FeedStateModel){ 
      return FeedStateModel.feed.model.feedPosts?.posts;
  }


  @Action(FetchHomeFeed)
  async FetchHomeFeed(ctx: StateContext<FeedStateModel>, {payload}: FetchHomeFeed) {
    // const response = await this.feedApi.fetchHomeFeed();
    console.log("FetchHomeFeed");
    const myfeed: IFeed = {
      user:{    
        userId: payload.uid,
      },
      posts:[],
    }
    const feed = myfeed;
    const myFetchHomeRequest: IGetHomeFeedRequest ={
      feed
    }
    const responseRef = await this.feedApi.GetHomeFeed(myFetchHomeRequest);
    const response = responseRef.data;  
      ctx.patchState({
        feed:{
          model:{
            users: null,
            feedPosts: response.feed,
            postComments: null
          },
          dirty: false,
          status: '',
          errors: {}
        }
      });
    }

  @Action(FetchDiscoveryFeed)
  async FetchDiscoveryFeed(ctx: StateContext<FeedStateModel>, {payload}: FetchHomeFeed) {
    // const response = await this.feedApi.fetchDiscoveryFeed();
    const myfeed: IFeed = {
      user:{    
        userId: payload.uid,
      },
      posts:[],
    }
    const feed = myfeed;
    const myFetchDiscoveryRequest: IGetDiscoveryFeedRequest ={
      feed
    }
    const responseRef = await this.feedApi.GetDiscoveryFeed(myFetchDiscoveryRequest);
    const response = responseRef.data;  
      ctx.patchState({
        feed:{
          model:{
            users: null,
            feedPosts: response.feed,
            postComments: null
          },
          dirty: false,
          status: '',
          errors: {}
        }
      });
    }


  @Action(FetchOwnPosts)
  async FetchOwnPosts(ctx: StateContext<FeedStateModel>,{payload}: FetchHomeFeed) {
    const myfeed: IFeed = {
      user:{    
        userId: payload.uid,
      },
      posts:[],
    }
    const feed = myfeed;
    const myFetchOwnRequest: IGetOwnFeedRequest ={
      feed
    }
    const responseRef = await this.feedApi.GetOwnFeed(myFetchOwnRequest);
    const response = responseRef.data;  
      ctx.patchState({
        feed:{
          model:{
            users: null,
            feedPosts: response.feed,
            postComments: null
          },
          dirty: false,
          status: '',
          errors: {}
        }
      });
    }
}