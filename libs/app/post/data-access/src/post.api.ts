import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { IIPost } from '@mp/api/post/util';
import { Timestamp } from 'firebase-admin/firestore';
// import {
//     IPost,
//     ICreatePostRequest,
//     ICreatePostResponse,
//     IFetchPostRequest,
//     IFetchPostResponse,
//     ISharePostRequest,
//     ISharePostResponse,
//     ISharePostRequest,
// } from '@mp/api/post/util';

@Injectable()
export class PostApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  post$(id: string) {
    // const docRef = doc(
    //   this.firestore,
    //   `profiles/${id}`
    // ).withConverter<IPost>({
    //   fromFirestore: (snapshot) => {
    //     return snapshot.data() as IPost;
    //   },
    //   toFirestore: (it: IPost) => it,
    // });
    // return docData(docRef, { idField: 'id' });
  }

  async createPost(request: IIPost) {
    // return await httpsCallable<
    //   ICreatePostRequest,
    //   ICreatePostResponse
    // >(
    //   this.functions,
    //   'createPost'
    // )(request);
    //console.log(request);
    console.log("data set.....")
    return request;
   
  }

  async fetchPost(/*request: IFetchPostRequest*/) {
    // return await httpsCallable<
    //   IFetchPostRequest,
    //   IFetchPostResponse
    // >(
    //   this.functions,
    //   'fetchPost'
    // )(request);
    const  mock={
      Document:{
        UserId: "test",
        Post : [{
            postId: "test-p1",
            contents:{
                post: "new post created",
                challenge: "test challenge",
                department: "test department",
            },
            likedProfileIds: [],
            dislikedProfileIds: [],
            timestamp: Timestamp.now(),
        }]
     }
    }

    return mock;
  }

  async sharePost(/*request: ISharePostRequest*/) {
    // return await httpsCallable<
    //   ISharePostRequest,
    //   ISharePostResponse
    // >(
    //   this.functions,
    //   'sharePost'
    // )(request);
  }

  ownPosts(){
    //load  your own posts
  }
}