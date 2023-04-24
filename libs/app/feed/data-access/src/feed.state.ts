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
import {IPost, ILikePostResponse} from '@mp/api/post/util';

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
      feedPosts: [],   /*****ADDED FEED POST FIELD ON THE STATE MODEL*****/
    }
})
@Injectable()
export class FeedState {//how are we going to do HomeFeed and DiscoveryFeed
// need to add: loadFeed, likePost, dislikePost, commentPost,


    constructor( //what does this do?
      private readonly feedApi: FeedApi,
      private readonly store: Store
    ) {}

  // @Action(LoadFeed)//dont know how
  // async LoadFeed(ctx: StateContext<FeedStateModel>, {payload}: LoadFeed) {
    
  //   ctx.patchState({
      
  //   });

  //   }

    @Action(LikePost)
    async LikePost(ctx: StateContext<FeedStateModel>, {payload}: LikePost) {
      const myPost: IPost = {//delete
        postId: '1234',
        userId: 'user123',
        likes: 10,
        dislikes: 2,
        message: 'This is a post message',
        comments: [],
        created: null
      };
      const myLikePostResponse: ILikePostResponse ={
        post:myPost
      }
      console.log("PostId (state):" + payload.postId);
      this.feedApi.LikePost(myLikePostResponse);
      ctx.patchState({
        
      });
  }

  @Action(DislikePost)
  async DislikePost(ctx: StateContext<FeedStateModel>, {payload}: DislikePost) {
    console.log("PostId dislike (state):" + payload.postId);
    ctx.patchState({
      
    });
}

  @Selector()
  static messages(state: FeedStateModel) 
  {
    return state.feed.model;
  }


  /***********SELECTOR FOR FEED POSTS**********/
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