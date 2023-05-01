import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext, Selector, Store } from '@ngxs/store';
import {
  fetchComments,
  sendComment,
    /*LoadFeed,*/
    LikePost,
    DislikePost,
    FetchHomeFeed,
    FetchDiscoveryFeed,
    FetchOwnPosts,
    ILikedAndDisliked
 } from '@mp/app/feed/util';
import { FeedApi } from './feed.api';
import {IPost, ILikePostResponse, IDislikePostResponse} from '@mp/api/post/util';
import { IComment, IUpdateCommentsRequest } from '@mp/api/comments/util';
import { DocumentReference, Timestamp } from '@angular/fire/firestore';
//import { Timestamp } from 'firebase-admin/firestore';
import { IFeed, IGetDiscoveryFeedRequest, IGetHomeFeedRequest, IGetOwnFeedRequest } from '@mp/api/feed/util';
import {Observable, Observer, PartialObserver, Subject, tap} from 'rxjs';
import produce from 'immer';
import {AuthState} from '@mp/app/auth/data-access';

export interface FeedStateModel{

  feed:{
    model:{
      users: any[] | null;
      feedPosts: DocumentReference[] | null;
      postComments: IComment[] | null;
      likedAndDisliked : ILikedAndDisliked| null;
    };
    dirty: false;
    status: string;
    errors: object;
  },
  likedAndDisliked : ILikedAndDisliked;
  feedPosts: DocumentReference[];
  postComments: IComment[];
  postInfo:{postId:string, ownerId:string};
}

@State<FeedStateModel>({
    name: 'feed',
    defaults: {
      feed:{
        model:{
          users: null,
          feedPosts:null,
          postComments: null,
          likedAndDisliked : null
        },
        dirty: false,
        status: '',
        errors: {}
      },
      feedPosts: [],
      postComments:[],
      postInfo:{postId:"", ownerId:""},
      likedAndDisliked : {liked:Promise.resolve([]), disliked:Promise.resolve([])}
    }
})
@Injectable()
export class FeedState {
  constructor(
    private readonly feedApi: FeedApi,
    private readonly store: Store,
  ) {

  }

  public posts$ = new Subject<IPost[]>();
  public subscriptions: any;
  public userId: any;

  async getUserId() {
      this.store
        .select(AuthState.user)
        .subscribe((x: any) => (this.userId = x?.uid));
  }

  @Action(LikePost)
  async LikePost(ctx: StateContext<FeedStateModel>, {payload}: LikePost) {
    const myLikePostResponse: ILikePostResponse ={
      userID : payload.userId,
      post : {
        postId : payload.postId,
        userId : payload.postUserID
      }
    }
    console.log("PostId (state):" + payload.postId);
      this.feedApi.LikePost(myLikePostResponse);
  }

  @Action(DislikePost)
  async DislikePost(ctx: StateContext<FeedStateModel>, {payload}: DislikePost) {
    const myDislikePostResponse: IDislikePostResponse ={
      userID : payload.userId,
      post : {
        postId : payload.postId,
        userId : payload.postUserID
      }
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
  static likedAndDisliked(state: FeedStateModel) {
    return state.likedAndDisliked;
    //return null;
  }

  @Selector()
  static getFeedPosts(FeedStateModel:FeedStateModel){
      return FeedStateModel.feedPosts;
  }

    /*************FETCH HOME FEED*************/

  @Action(FetchHomeFeed)
  async FetchHomeFeed(ctx: StateContext<FeedStateModel>, {payload}: FetchHomeFeed) {
    // const response = await this.feedApi.fetchHomeFeed();
    await this.getUserId();
    console.log("FetchHomeFeed");
    const myfeed: IFeed = {
      user:{
        userId: this.userId,
      },
      posts:[],
    }
    const feed = myfeed;
    const myFetchHomeRequest: IGetHomeFeedRequest ={
      feed
    }
    const newFeed:DocumentReference[] = await this.feedApi.GetHomeFeed$(myFetchHomeRequest);
    ctx.patchState({
      feedPosts:newFeed
    })
    }

  @Action(FetchDiscoveryFeed)
  async FetchDiscoveryFeed(ctx: StateContext<FeedStateModel>, {payload}: FetchHomeFeed) {
    // const response = await this.feedApi.fetchDiscoveryFeed();
    await this.getUserId();
    const myfeed: IFeed = {
      user:{
        userId: this.userId,
      },
      posts:[],
    }
    const feed = myfeed;
    const myFetchDiscoveryRequest: IGetDiscoveryFeedRequest ={
      feed
    }
    const newFeed:DocumentReference[] = await this.feedApi.GetDiscoveryFeed(myFetchDiscoveryRequest);
    ctx.patchState({
      feedPosts:newFeed
    })
    }


  @Action(FetchOwnPosts)
  async FetchOwnPosts(ctx: StateContext<FeedStateModel>,{payload}: FetchHomeFeed) {
    await this.getUserId();
    const myfeed: IFeed = {
      user:{
        userId: this.userId,
      },
      posts:[],
    }
    const feed = myfeed;
    const myFetchOwnRequest: IGetOwnFeedRequest ={
      feed
    }

    const newFeed:DocumentReference[] = await this.feedApi.GetOwnFeed(myFetchOwnRequest,this.posts$);
    ctx.patchState({
      feedPosts:newFeed
    })
  }

  @Action([FetchOwnPosts,FetchHomeFeed, FetchDiscoveryFeed])
  async updateLikedAndDisliked(ctx:StateContext<FeedStateModel>) {
    await this.getUserId();
    const likedAndDisliked = this.feedApi.getProfileLikedAndDisliked(this.userId);
    ctx.patchState({
      likedAndDisliked: {
        liked: (await likedAndDisliked).liked,
        disliked: (await likedAndDisliked).disliked
      }
    })
  }


    @Selector()
    static getComments(FeedStateModel:FeedStateModel){
        return FeedStateModel.postComments;
    }

    @Selector()
    static getPostsInfo(FeedStateModel:FeedStateModel){
        return FeedStateModel.postInfo;
    }

    @Action(fetchComments)
    async fetchComments(ctx: StateContext<FeedStateModel>,{payload}:fetchComments) {
        const state=ctx.getState();
        ctx.setState({...state,
          postComments:payload.comments ? payload.comments : [],
          postInfo:{postId:payload.postId, ownerId:payload.ownerId}
        });
      }

      @Action(sendComment)
      async sendComment(ctx: StateContext<FeedStateModel>,{payload}:sendComment) {
        /**SEND THIS INFORMATION TO THE DATABASE......
        *postId:this.postId,
        senderId:this.senderId,
        text:this.text,
        commentId:"",
        ownerId:this.ownerId,
        timestamp:timestamp
        */
        const req: IUpdateCommentsRequest = {
          comment: {
            userID: payload.senderId,
            text: payload.text,
            timestamp: payload.timestamp,
            commentID: payload.commentId,
            postID: payload.postId,
          }
        }
        const responseRef = await this.feedApi.SendComment(req);
        console.log("response-SendComment")
        const response=responseRef.data;

        //RETURN THIS AS THE RESPONSE.....AND UPDATE THE STATE
        const comment:IComment={
          userID: payload.senderId,
          text: payload.text,
          timestamp: payload.timestamp,
          commentID: payload.commentId,
          postID : payload.postId
        }

        const state=ctx.getState();
        ctx.setState({...state,
          // postComments:[comment,...state.postComments]
          postComments: [response.comments[0],...state.postComments]
        });

      }




      getMock(){
      const c1:IComment={
        userID: "TT1",
        text: 'payload.text',
        commentID: 'payload.commentId',
        postID : 'payload.postId',
        timestamp: Timestamp.fromDate(new Date()),
      }
      const c2:IComment={
        userID: "TT3",
        text: 'payload.text',
        commentID: 'payload.commentId',
        postID : 'payload.postId',
        timestamp: Timestamp.fromDate(new Date()),
      }

      const c3:IComment={
        userID: "TT@",
        text: 'payload.text',
        commentID: 'payload.commentId',
        postID : 'payload.postId',
        timestamp: Timestamp.fromDate(new Date()),
      }

      const Comments:IComment[]=[c1,c2,c3]
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
          created: Timestamp.fromDate(new Date()),
          challenge: "",
          department: "",
          comments:Comments
        },
        {
          postId: "kdjfldksjfofjiejodklfjdksjfkdj",
          userId: "Test 1",
          likes: 10,
          dislikes: 2,
          message: "WPM : 45, Road to 50",
          created: Timestamp.fromDate(new Date()),
          challenge: "WPM",
          department: "EMS DEPARTMENT",
           comments:Comments
        },
        {
          postId: "kdjfldksjfofkfljdkejodklfjdksjfkdj",
          userId: "Test 2",
          likes: 10,
          dislikes: 2,
          message: "WPM : 90, NEW LEAD SCORE",
          created: Timestamp.fromDate(new Date()),
          challenge: "WPM",
          department: "CIVIL ENGINEERING DEPARTMENT",
           comments:Comments
        },
        {
          postId: "kdjfldksjfofjiejodklfjdksjfkkdjfj",
          userId: "Test 3",
          likes: 10,
          dislikes: 2,
          message: "WPM : 15, STILL LEARNING HOW TO TOUCH TYPE",
          created: Timestamp.fromDate(new Date()),
          challenge: "WPM",
          department: "CS DEPARTMENT",
           comments:Comments
        }]
      }

       return feed;
    }
}
