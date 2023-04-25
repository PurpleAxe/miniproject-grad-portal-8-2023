import { IFeed } from '@mp/api/feed/util';
import { IPost } from '@mp/api/post/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FeedRepository {
  async getHomeFeed(feed: IFeed): Promise<IPost[]> {
    // get user
    var user = null;
    const f = await admin
    .firestore()
    .collection('profiles')
    .where("userId", "==", feed.user.userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        user = doc.data()
      });
    });

    //get department users
    var deptUsers = {};
    for(var deptUser of user.userDepartments) {
      const f = await admin
      .firestore()
      .collection('departments')
      .where("departmentId", "==", deptUser)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          for(var u of doc.data().users)
            deptUsers[u] = 0;
        });
      });
    }

    // get posts
    var posts = [];
    for(var userInDepartment of Object.keys(deptUsers)) {
      if(userInDepartment == user.userId) {
        continue;
      }
      const f = await admin
      .firestore()
      .collection('profiles')
      .where("userId", "==", userInDepartment)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          posts = posts.concat(doc.data().posts);
        });
      });
    }

    return posts
  }

  async getOwnFeed(feed: IFeed): Promise<IPost[]> {
    var data = null
    const f = await admin
    .firestore()
    .collection('profiles')
    .where("userId", "==", feed.user.userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // console.log(doc.data().posts);
          data = doc.data().posts;
      });
    });
    return data;
  }

  async getDiscoveryFeed(feed: IFeed): Promise<IPost[]> {
    var posts = {};
    const f = await admin
    .firestore()
    .collection('profiles')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        posts[doc.data().userId] = doc.data().posts;
      });
    });

    delete posts[feed.user.userId]
    
    console.log(posts)
    var response = []
    for(var p of Object.keys(posts))
      response = response.concat(posts[p])
      console.log(response)
    return response;
  }




}