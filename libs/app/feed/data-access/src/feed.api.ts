import { Injectable } from '@angular/core';
import { collection, doc, docData, Firestore, query, where, getDocs, onSnapshot } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { GetOwnFeedEvent, IFeed } from '@mp/api/feed/util';
import { Timestamp } from '@angular/fire/firestore';
import {
    IPost,
    ICreateCommentResponse,
    IDislikePostResponse,
    ILikePostResponse,
    ICreateCommentRequest,
    IDislikePostRequest,
    ILikePostRequest,


} from '@mp/api/post/util';
import {
  IGetHomeFeedRequest,
  IGetHomeFeedResponse,
  IGetOwnFeedRequest,
  IGetOwnFeedResponse,
  IGetDiscoveryFeedRequest,
  IGetDiscoveryFeedResponse,
} from '@mp/api/feed/util';
import { IUpdateCommentsRequest, IUpdateCommentsResponse } from '@mp/api/comments/util';
import {IProfile} from '@mp/api/profiles/util';
import {log} from 'console';


@Injectable()
export class FeedApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  post$(id: string) {
    const docRef = doc(
      this.firestore,
      `post/${id}`
    ).withConverter<IPost>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IPost;
      },
      toFirestore: (it: IPost) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  async LikePost(request: ILikePostRequest){
    console.log("feed.api LikePost working: " + request.post.postId + " " + request.post.userId);
    return await httpsCallable<
    ILikePostResponse,
    ILikePostRequest
  >(
    this.functions,
    'likePost'
  )(request);
  }

  async DislikePost(request: IDislikePostRequest){
    console.log("feed.api DislikePost working");
    return await httpsCallable<
    IDislikePostResponse,
    IDislikePostRequest
  >(
    this.functions,
    'dislikePost'
  )(request);
  }

  async GetHomeFeed$(request: IGetHomeFeedRequest){
    const feed = request.feed; // ease of use
    const allUsers = collection(this.firestore, "profiles"); // find profiles that fit criteria
    const departmentFilter = query(allUsers, where("userDepartments", "in", feed.user.userDepartments));
    const challengesAndDepartmentFilter  = query(departmentFilter, where("challenges", "in", feed.user.challenges));
    const excludeCurrent = query(challengesAndDepartmentFilter, where("userId", "!=", feed.user.userId));
    const querySnapshot = await getDocs(excludeCurrent);
    const profiles: IProfile[] = querySnapshot.docs.map((doc) => {
      return doc.data() as IProfile;
    });

    // Get all our related posts based on the profiles
    const allPosts = collection(this.firestore, "post");
    const filter = query(allPosts, where("userId", "in", profiles.map((profile) => {return profile.userId;})));
    const relatedPosts = await getDocs(filter);
    const toReturn: IGetHomeFeedResponse = {
      feed : {
        user : feed.user,
        posts : relatedPosts.docs.map((doc) => {return doc.data() as IPost})
      }
    };
    return  toReturn;

  }

  async GetDiscoveryFeed(request: IGetDiscoveryFeedRequest){
    return await httpsCallable<
    IGetDiscoveryFeedResponse,
    IGetDiscoveryFeedRequest
      >(
    this.functions,
    'fetchDiscoveryFeed'
  )(request);
  }
  async GetOwnFeed(request: IGetOwnFeedRequest){
    const posts = collection(this.firestore,"post")
    const filter = query(posts, where("userId", "==", request.feed.user.userId));
    const querySnapshot = await getDocs(filter);
    const response =
      {
        feed: {
          user:request.feed.user,
          posts: querySnapshot.docs.map((doc) => {
            return doc.data() as IPost;
          })
        }
      };
    return response;
  }

  async SendComment(request: IUpdateCommentsRequest){
    // console.log("feed.api LikePost working: " + request.post.postId + " " + request.post.userId);
    return await httpsCallable<
    IUpdateCommentsRequest,
    IUpdateCommentsResponse
  >(
    this.functions,
    'updateComments'
  )(request);
  }
}
