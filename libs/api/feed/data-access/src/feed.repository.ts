import { IFeed } from '@mp/api/feed/util';
import { IPost } from '@mp/api/post/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FeedRepository {

  async getHomeFeed(feed: IFeed): Promise<IPost[]> {
    var user = await this.get_document(feed.user.userId, "profiles");
    var users = await this.get_collection("profiles");
    var posts = [];
    var postIds = [];

    if("userDepartment" in user && "challenges" in user)
      for(var otherUser of users) {
        if(user.userId != otherUser.userId)
          if("userDepartment" in otherUser && "challenges" in otherUser)
          for(var a of user.userDepartment) {
            for(var b of otherUser.userDepartment) {
              if(a == b)
                if("posts" in otherUser)
                  postIds = postIds.concat(otherUser.posts);
            }
          }
            for(var a of user.challenges) {
              for(var b of otherUser.challenges) {
                if(a == b)
                  if("posts" in otherUser)
                    postIds = postIds.concat(otherUser.posts);
              }
          }
      }

      for(var postId of postIds) {
        var postObject = await this.get_document(postId, "post");
        if(postObject != null)
          posts.push(postObject);
      }
      return posts;
  }

  async getDiscoveryFeed(feed: IFeed): Promise<IPost[]> {
    var user = await this.get_document(feed.user.userId, "profiles");
    var users = await this.get_collection("profiles");
    var posts = [];
    var postIds = [];

      for(var otherUser of users) {
        if(user.userId != otherUser.userId)
          if("posts" in otherUser)
            postIds = postIds.concat(otherUser.posts);
      }

      this.shuffleArray(postIds);

      for(var postId of postIds) {
        var postObject = await this.get_document(postId, "post");
        if(postObject != null)
          posts.push(postObject);
      }
      
      return posts;
  }

  async getOwnFeed(feed: IFeed): Promise<IPost[]> {
    var user = await this.get_document(feed.user.userId, "profiles");
    var posts = [];
    if(user != null && "posts" in user)
    for(var postId of user.posts) {
      const post = await this.get_document(postId, "post");
      if(post != null)
      posts.push(post);
    }
    
    return posts;
  }

  async shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  async get_document(id: string, collection: string) {
    var response = null;
    const f = await admin
    .firestore()
    .collection(collection)
    .doc(id)
    .get()
    response = f.data();
    return response;
  }

  async get_collection(collection) {
    const snapshot = await admin.firestore().collection(collection).get()
    return snapshot.docs.map(doc => doc.data());
  }

  async search_for(key: string, value: any, collection: string) {
    var response = null;
    const f = await admin
    .firestore()
    .collection(collection)
    .where(key, "==", value)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        response = doc.data();
      });
    });
    return response;
  }

  async get(key: string, value: any, collection: string) {
    var response = null;
    const f = await admin
    .firestore()
    .collection(collection)
    .where(key, "==", value)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        response = doc.data();
      });
    });
    return response;
  }

}

