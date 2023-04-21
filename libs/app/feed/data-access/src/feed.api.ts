import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { IPost } from '@mp/api/post/util';
import { Timestamp } from 'firebase-admin/firestore';
import { IFeed, IFeedStateModel } from './feed.state';

@Injectable()
export class FeedApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}


    async fetchHomeFeed(/*request: IFetchPostRequest*/) {
        // return await httpsCallable<
        //   IFetchPostRequest,
        //   IFetchPostResponse
        // >(
        //   this.functions,
        //   'fetchPost'
        // )(request);
        const mock :IFeedStateModel={
            feedPosts:[
                {Post:{
                    UserId: "test",
                    Post : {
                        postId: "test-p1",
                        contents:{
                            post: "new post created",
                            challenge: "test challenge",
                            department: "test department",
                        },
                        likedProfileIds: [],
                        dislikedProfileIds: [],
                        timestamp: Timestamp.now(),
                    }
                }},
                {Post:{
                    UserId: "test-2",
                    Post : {
                    postId: "test-2-p1",
                    contents:{
                        post: "new post created",
                        challenge: "test-1 challenge",
                        department: "test-1 department",
                    },
                    likedProfileIds: [],
                    dislikedProfileIds: [],
                    timestamp: Timestamp.now(),
                    }
                }}
            ]
        }
        return mock.feedPosts;
    }
}

// {Post:{
//     UserId: "test",
//     Post : {
//         postId: "test-p1",
//         contents:{
//             post: "new post created",
//             challenge: "test challenge",
//             department: "test department",
//         },
//         likedProfileIds: [],
//         dislikedProfileIds: [],
//         timestamp: Timestamp.now(),
//     }
// }},
// {Post:{
//     UserId: "test-2",
//     Post : {
//     postId: "test-2-p1",
//     contents:{
//         post: "new post created",
//         challenge: "test-1 challenge",
//         department: "test-1 department",
//     },
//     likedProfileIds: [],
//     dislikedProfileIds: [],
//     timestamp: Timestamp.now(),
//     }
// }}