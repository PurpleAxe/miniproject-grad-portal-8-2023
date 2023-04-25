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
import { IFeed } from '@mp/api/feed/util';

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
}

  @Selector()
  static messages(state: FeedStateModel) 
  {
    return state.feed.model;
  }

  @Selector()
    static getFeedPosts(FeedStateModel:FeedStateModel){ 
        return FeedStateModel.feed.model.feedPosts?.posts;
    }


  @Action(FetchHomeFeed)
  async FetchHomeFeed(ctx: StateContext<FeedStateModel>) {
    // const response = await this.feedApi.fetchHomeFeed();
    const response=this.getMock();
      ctx.patchState({
        feed:{
          model:{
            users: null,
            feedPosts: response,
            postComments: null
          },
          dirty: false,
          status: '',
          errors: {}
        }
      });

    }

  @Action(FetchDiscoveryFeed)
  async FetchDiscoveryFeed(ctx: StateContext<FeedStateModel>) {
    // const response = await this.feedApi.fetchDiscoveryFeed();
      const response=this.getMock();
      ctx.patchState({
        feed:{
          model:{
            users: null,
            feedPosts: response,
            postComments: null
          },
          dirty: false,
          status: '',
          errors: {}
        }
      });

    }


  // @Action(FetchOwnPosts)
  // async FetchOwnPosts(ctx: StateContext<FeedStateModel>) {
  //   const response = await this.feedApi.GetDiscoveryFeed();
  //     // const response=this.getMock();
  //     ctx.patchState({
  //       feed:{
  //         model:{
  //           users: null,
  //           feedPosts: response,
  //           postComments: null
  //         },
  //         dirty: false,
  //         status: '',
  //         errors: {}
  //       }
  //     });
  //   }


    getMock(){
      const feed={
        user:{
          userId:"Testing",
        },
        posts:[{
          postId: "kdjfldksjfofjiejodghghklfjdksjfkdj",
          userId: "Test 0",
          likes: 10,
          dislikes: 2,
          message: "WPM : 45, Road to 50",
          created: Timestamp.now(),
          challenge: "",
          department: ""
        },
        {
          postId: "kdjfldksjfofjiejodklfjdksjfkdj",
          userId: "Test 1",
          likes: 10,
          dislikes: 2,
          message: "WPM : 45, Road to 50",
          created: Timestamp.now(),
          challenge: "WPM",
          department: "EMS DEPARTMENT"
        },
        {
          postId: "kdjfldksjfofkfljdkejodklfjdksjfkdj",
          userId: "Test 2",
          likes: 10,
          dislikes: 2,
          message: "WPM : 90, NEW LEAD SCORE",
          created: Timestamp.now(),
          challenge: "WPM",
          department: "CIVIL ENGINEERING DEPARTMENT"
        },
        {
          postId: "kdjfldksjfofjiejodklfjdksjfkkdjfj",
          userId: "Test 3",
          likes: 10,
          dislikes: 2,
          message: "WPM : 15, STILL LEARNING HOW TO TOUCH TYPE",
          created: Timestamp.now(),
          challenge: "WPM",
          department: "CS DEPARTMENT"
        }
        ]
      }
      return feed;
    }
}