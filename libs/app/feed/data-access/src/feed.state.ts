import { Injectable } from '@angular/core';
// import { Register as AuthRegister } from '@mp/app/auth/util';
// import { SetError } from '@mp/app/errors/util';
// import { Register } from '@mp/app/register/util';
import { Action, State, StateContext, Selector, Store } from '@ngxs/store';
import { 
  fetchComments,
  sendComment,
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
  postInfo:{postId:string, ownerId:string};
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
          userId:"Testing",
        },
        posts:[]
      },
      postComments:[],
      postInfo:{postId:"", ownerId:""}
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

    @Selector()
    static getUserId(FeedStateModel:FeedStateModel){ 
        return FeedStateModel.feedPosts.user.userId;
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
        const posts=state.feedPosts.posts;
        let i=0;
        let found=false;
        let response:IComment[]=[];
        while(i<posts.length && !found){
          if(posts[i].postId==payload.postId){
            response=posts[i].comments!;
            found=true;
            break;
          }
          i++;
        }
        if(found){
          ctx.setState({...ctx.getState(),
            postComments:response,
            postInfo:{postId:payload.postId, ownerId:payload.ownerId}
          });
        }
      }

      @Action(sendComment)
      async sendComment(ctx: StateContext<FeedStateModel>,{payload}:sendComment) {
        /**SEND THIS INFORMATION TO THE DATABASE......
         * postId:this.postId,
          senderId:this.senderId,
          text:this.text,
          commentId:"",
          ownerId:this.ownerId,
          timestamp:timestamp
         */
        // const response = await this.feedApi.sendComment(payload);


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
            postComments:[comment,...state.postComments]
          });
    
        }
    
  

    getMock(){
      const c1:IComment={
        userID: "TT1",
        text: 'payload.text',
        commentID: 'payload.commentId',
        postID : 'payload.postId'
      }
      const c2:IComment={
        userID: "TT3",
        text: 'payload.text',
        commentID: 'payload.commentId',
        postID : 'payload.postId'
      }

      const c3:IComment={
        userID: "TT@",
        text: 'payload.text',
        commentID: 'payload.commentId',
        postID : 'payload.postId'
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
          //created: Timestamp.fromDate(new Date()),
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
          //created: Timestamp.fromDate(new Date("April, 2023")),
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
          //created: Timestamp.fromDate(new Date("March, 2023")),
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
          // created: Timestamp.fromDate(new Date('February, 2023')),
          challenge: "WPM",
          department: "CS DEPARTMENT",
           comments:Comments
        }
        ]
      }
      return feed;
    }
}