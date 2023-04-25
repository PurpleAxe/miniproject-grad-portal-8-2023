import { Injectable } from '@angular/core';
// import { Register as AuthRegister } from '@mp/app/auth/util';
// import { SetError } from '@mp/app/errors/util';
// import { Register } from '@mp/app/register/util';
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
import {IPost, ILikePostResponse, IComment} from '@mp/api/post/util';
import { Timestamp } from 'firebase-admin/firestore';
import { IFeed } from '@mp/api/feed/util';

export interface FeedStateModel{

  feed:{
    model:{
      users: any[] | null;
    };
    dirty: false;
    status: string;
    errors: object;
  },
  feedPosts: IFeed;
  postComments: IComment[];
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
      feedPosts: {
        user:{
          userId:"",
        },
        posts:[]
      },
      postComments:[]
    }
})
@Injectable()
export class FeedState {//how are we going to do HomeFeed and DiscoveryFeed
// need to add: loadFeed, likePost, dislikePost, commentPost,


    constructor( //what does this do?
      private readonly feedApi: FeedApi,
      private readonly store: Store
    ) {}

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
      // this.feedApi.LikePost(myLikePostResponse);
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
        return FeedStateModel.feedPosts.posts;
    }



    /*************FETCH HOME FEED*************/
  @Action(FetchHomeFeed)//dont know how
  async FetchHomeFeed(ctx: StateContext<FeedStateModel>) {
    // const response = await this.feedApi.fetchHomeFeed();
    const response=this.getMock();
      ctx.patchState({
        feedPosts:response
      });

    }


       /*************FETCH DISCOVERY FEED*************/
  @Action(FetchDiscoveryFeed)//dont know how
  async FetchDiscoveryFeed(ctx: StateContext<FeedStateModel>) {
    // const response = await this.feedApi.fetchDiscoveryFeed();
      const response=this.getMock();
      ctx.patchState({
        feedPosts:response
      });

    }


    @Action(FetchOwnPosts)//dont know how
  async FetchOwnPosts(ctx: StateContext<FeedStateModel>) {
    // const response = await this.feedApi.fetchDiscoveryFeed();
      const response=this.getMock();
      ctx.patchState({
        feedPosts:response
      });

    }


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
          //created: Timestamp.fromDate(new Date()),
          challenge: "",
          department: ""
        },
        {
          postId: "kdjfldksjfofjiejodklfjdksjfkdj",
          userId: "Test 1",
          likes: 10,
          dislikes: 2,
          message: "WPM : 45, Road to 50",
          //created: Timestamp.fromDate(new Date("April, 2023")),
          challenge: "WPM",
          department: "EMS DEPARTMENT"
        },
        {
          postId: "kdjfldksjfofkfljdkejodklfjdksjfkdj",
          userId: "Test 2",
          likes: 10,
          dislikes: 2,
          message: "WPM : 90, NEW LEAD SCORE",
          //created: Timestamp.fromDate(new Date("March, 2023")),
          challenge: "WPM",
          department: "CIVIL ENGINEERING DEPARTMENT"
        },
        {
          postId: "kdjfldksjfofjiejodklfjdksjfkkdjfj",
          userId: "Test 3",
          likes: 10,
          dislikes: 2,
          message: "WPM : 15, STILL LEARNING HOW TO TOUCH TYPE",
          created: Timestamp.fromDate(new Date('February, 2023')),
          challenge: "WPM",
          department: "CS DEPARTMENT"
        }
        ]
      }
      return feed;
    }
}