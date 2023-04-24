import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { IIPost } from '@mp/api/post/util';
import { Timestamp } from 'firebase-admin/firestore';
import { IIFeed } from '@mp/api/feed/util';

@Injectable()
export class FeedApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  async hello(){
    console.log("hello");
  }

    async fetchHomeFeed(/*request: IFetchPostRequest*/) {
        // return await httpsCallable<
        //   IFetchPostRequest,
        //   IFetchPostResponse
        // >(
        //   this.functions,
        //   'fetchHomePost'
        // )(request);
        const p1 : IIFeed={Post:{
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
        }};
        const p2:IIFeed={Post:{
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
            //timestamp: Timestamp.now(),
            }
        }}
        const MockFeedPosts:IIFeed[]=new Array<IIFeed>(p1,p2);
    return MockFeedPosts;
    }


    async fetchDiscoveryFeed(/*request: IFetchPostRequest*/) {
        // return await httpsCallable<
        //   IFetchPostRequest,
        //   IFetchPostResponse
        // >(
        //   this.functions,
        //   'fetchDiscoveryPost'
        // )(request);
        
            const p1 : IIFeed={Post:{
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
            }};
            const p2:IIFeed={Post:{
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
                //timestamp: Timestamp.now(),
                }
            }}
            const MockFeedPosts:IIFeed[]=new Array<IIFeed>(p1,p2);
        return MockFeedPosts;
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