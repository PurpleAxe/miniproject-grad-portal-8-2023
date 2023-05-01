import { Injectable } from '@angular/core';
import { collection, doc, docData, Firestore, query, where, getDocs, onSnapshot, collectionData, QuerySnapshot, DocumentSnapshot, DocumentReference, getDoc } from '@angular/fire/firestore';
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
import {map, Observable, Observer, Subject, tap} from 'rxjs';
import {ILikedAndDisliked} from '../../util/src/ILikedAndDisliked.interface';


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

  async getProfileLikedAndDisliked(userID : string):Promise<ILikedAndDisliked> {
  const allUsers = collection(this.firestore, "profiles");
    const filter = query(allUsers, where("userId", "==", userID));

    const getLikedRefs = async () => {
      const docs = await getDocs(filter);
      const likedPromises = docs.docs.map(async (doc) => {
        const liked = collection(doc.ref, "likedPosts");
        const likedDocs = await getDocs(liked);
        return likedDocs.docs.map((doc) => doc.ref);
      });
      const likedResults = await Promise.all(likedPromises);
      return likedResults.flat();
    };

    const getDislikedRefs = async () => {
      const docs = await getDocs(filter);
      const dislikedPromises = docs.docs.map(async (doc) => {
        const disliked = collection(doc.ref, "dislikedPosts");
        const dislikedDocs = await getDocs(disliked);
        return dislikedDocs.docs.map((doc) => doc.ref);
      });
      const dislikedResults = await Promise.all(dislikedPromises);
      return dislikedResults.flat();
    };

    const likedRefs = await getLikedRefs();
    const dislikedRefs = await getDislikedRefs();

    const existingLikedRefs = await Promise.all(
      likedRefs.map(async (ref) => {
        const doc = await getDoc(ref);
        if (doc.exists()) {
          return ref;
        } else {
          return null;
        }
      })
    );

    const existingDislikedRefs = await Promise.all(
      dislikedRefs.map(async (ref) => {
        const doc = await getDoc(ref);
        if (doc.exists()) {
          return ref;
        } else {
          return null;
        }
      })
    );

    const filteredLikedRefs = existingLikedRefs.filter((ref) => ref !== null) as DocumentReference[];
    const filteredDislikedRefs = existingDislikedRefs.filter((ref) => ref !== null) as DocumentReference[];

    const toReturn: ILikedAndDisliked = {
      liked: filteredLikedRefs!,
      disliked: filteredDislikedRefs!,
    };
    return toReturn;
  }

  async GetHomeFeed$(request: IGetHomeFeedRequest):Promise<DocumentReference[]>{
    const feed = request.feed; // ease of use
    const allUsers = collection(this.firestore, "profiles"); // find profiles that fit criteria
    log("test");
    //const departmentFilter = query(allUsers, where("userDepartments", "in", feed.user.userDepartments));
    log("test");
    //const challengesAndDepartmentFilter  = query(departmentFilter, where("challenges", "in", feed.user.challenges));
    log("test");
    //const excludeCurrent = query(challengesAndDepartmentFilter, where("userId", "!=", feed.user.userId));
    const excludeCurrent = query(allUsers, where("userId", "!=", feed.user.userId));
    log("test");
    const querySnapshot = await getDocs(excludeCurrent);
    const profiles: IProfile[] = querySnapshot.docs.map((doc) => {
      return doc.data() as IProfile;
    });

    // Get all our related posts based on the profiles
    const allPosts = collection(this.firestore, "post");
    const filter = query(allPosts, where("userId", "in", profiles.map((profile) => {return profile.userId;})));

    const snap:Promise<QuerySnapshot> = getDocs(filter);
    return snap.then((col) => {
      const docs:DocumentReference[] = [];
      col.forEach((doc) => {
        docs.push(doc.ref);
      })
      return docs;
    })

  }

  async GetDiscoveryFeed(request: IGetDiscoveryFeedRequest): Promise<DocumentReference[]>{
    const feed = request.feed; // ease of use

    const allUsers = collection(this.firestore, "profiles"); // find profiles that fit criteria
    const challengesAndDepartmentFilter  = query(allUsers, where("challenges", "not-in", feed.user.challenges));
    const excludeCurrent = query(challengesAndDepartmentFilter, where("userId", "!=", feed.user.userId));
    const querySnapshot = await getDocs(excludeCurrent);
    const profiles: IProfile[] = querySnapshot.docs.map((doc) => {
      return doc.data() as IProfile;
    });

    // Get all our related posts based on the profiles
    const allPosts = collection(this.firestore, "post");
    const filter = query(allPosts, where("userId", "in", profiles.map((profile) => {return profile.userId;})));
    const snap:Promise<QuerySnapshot> = getDocs(filter);
    return snap.then((col) => {
      const docs:DocumentReference[] = [];
      col.forEach((doc) => {
        docs.push(doc.ref);
      })
      return docs;
    })
  }

  async GetOwnFeed(request: IGetOwnFeedRequest, observer: Subject<IPost[]>): Promise<DocumentReference[]> {
    // converted to return references.
    const posts = collection(this.firestore,"post")
    const filter = query(posts, where("userId", "==", request.feed.user.userId));
    const snap:Promise<QuerySnapshot> = getDocs(filter);
    return snap.then((col) => {
      const docs:DocumentReference[] = [];
      col.forEach((doc) => {
        docs.push(doc.ref);
      })
      return docs;
    })
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
