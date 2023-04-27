import { IFeed } from '@mp/api/feed/util';
import { IPost } from '@mp/api/post/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FeedRepository {

  async getHomeFeed(feed: IFeed): Promise<IPost[]> {
    // get user
    var user = await this.search(feed.user.userId, "profiles");
    var posts = [];

    if("posts" in user)
      posts = user.posts;
    
    console.log(await this.get_all("profiles"));
    
      
    console.log("getHomeFeed")
    console.log(user);
    return [];
  }

  async get_all(collection) {
    // get user
    var response = null;
    const f = await admin
    .firestore()
    .collection(collection)
    .get()

    console.log("get_all")
    console.log(response);
    return response;
  }

  async getDiscoveryFeed(feed: IFeed): Promise<IPost[]> {
    var user = await this.search(feed.user.userId, "profiles");
    var posts = [];

    return posts;
  }

  async getOwnFeed(feed: IFeed): Promise<IPost[]> {
    // console.log("feed")
    // console.log(feed)
    // console.log()
    var user = await this.search(feed.user.userId, "profiles");
    // console.log("user")
    // console.log(user)
    // console.log()
    var posts = [];
    if(user != null && "posts" in user)
    for(var postId of user.posts) {
      const post = await this.search(postId, "post");
      if(post != null)
      posts.push(post);
    }
    // console.log("getOwnFeed")
    // console.log(posts)
    
    return posts;
  }

  async search(id: string, collection: string) {
    var response = null;
    const f = await admin
    .firestore()
    .collection(collection)
    .doc(id)
    .get()
    response = f.data();
    return response;
  }

  // async getHomeFeed(feed: IFeed): Promise<IPost[]> {
  //   // get user
  //   var user = null;
  //   const f = await admin
  //   .firestore()
  //   .collection('profiles')
  //   .where("userId", "==", feed.user.userId)
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       user = doc.data();
  //     });
  //   });

  //   if(user == null)
  //     return [];
    
  //     //get department users
  //     var deptUsers = {};
  //     if("userDepartments" in user) {
  //       for(var deptUser of user.userDepartments) {
  //         const f = await admin
  //         .firestore()
  //         .collection('departments')
  //         .where("departmentId", "==", deptUser)
  //         .get()
  //         .then((querySnapshot) => {
  //           querySnapshot.forEach((doc) => {
  //             if("users" in doc.data() == true)
  //               for(var u of doc.data().users)
  //               deptUsers[u] = 0;
  //           });
  //         });
  //       }
  //     }
  //     console.log(deptUsers)

  //   if(Object.keys(deptUsers).length == 0)
  //     return []

  //   // get posts
  //   var posts = [];
  //   for(var userInDepartment of Object.keys(deptUsers)) {
  //     if("userId" in user)
  //       if(userInDepartment == user.userId) {
  //         continue;
  //       }
  //     console.log(userInDepartment)
  //     const f = await admin
  //     .firestore()
  //     .collection('profiles')
  //     .where("userId", "==", userInDepartment)
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         console.log(doc.data())
  //         if("posts" in doc.data())
  //           posts = posts.concat(doc.data().posts);
  //       });
  //     });
  //   }
  //   console.log(posts)
  //   return posts
  // }

}

