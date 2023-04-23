import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext, Selector, Store } from '@ngxs/store';
import { 
    LoadFeed,
    LikePost,
    DislikePost
 } from '@mp/app/feed/util';
 import { FeedApi } from './feed.api';
 import {IPost, ILikePostResponse} from '@mp/api/post/util';


// export interface IFeed{
//     Post:{
//         UserId: string | null;
//         Post : {
//             postId: string | null;
//             contents:{
//                 post: string | null;
//                 challenge: string | null;
//                 department: string | null;
//             },
//             likedProfileIds: [];
//             dislikedProfileIds: [];
//             comments: [];
//             // timestamp: Timestamp | null;
//         }
//     }
// }

// export interface IFeedStateModel{
//     feedPosts: IFeed[];
// }

// @State<IFeedStateModel>({

// })

export interface FeedStateModel{

  feed:{
    model:{
      users: any[] | null;
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
        },
        dirty: false,
        status: '',
        errors: {}
      }
    }
})
@Injectable()
export class FeedState {//how are we going to do HomeFeed and DiscoveryFeed
// need to add: loadFeed, likePost, dislikePost, commentPost,


    constructor( //what does this do?
      // private readonly feedApi: FeedApi,
      private readonly store: Store
    ) {}

  @Action(LoadFeed)//dont know how
  async LoadFeed(ctx: StateContext<FeedStateModel>, {payload}: LoadFeed) {
    
    ctx.patchState({
      
    });
    }

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
      // this.profileApi.LikePost(myLikePostResponse);
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
}