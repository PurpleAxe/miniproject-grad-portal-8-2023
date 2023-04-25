import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Timestamp } from 'firebase-admin/firestore';
import {
    IPost,
    ICreateCommentResponse,
    IDislikePostResponse,
    ILikePostResponse,
    ICreateCommentRequest,
    IDislikePostRequest,
    ILikePostRequest

} from '@mp/api/post/util';

import {
  IGetFeedRequest,
  IGetFeedResponse      
} from '@mp/api/feed/util';

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

  async FetchHomeFeed(request: IGetFeedRequest){
    return await httpsCallable<
    IGetFeedRequest,
    IGetFeedResponse
      >(
    this.functions,
    'fetchHomeFeed'
  )(request);
  }
  }
