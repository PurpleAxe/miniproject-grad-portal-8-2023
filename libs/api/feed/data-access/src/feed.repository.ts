import { IFeed } from '@mp/api/feed/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FeedRepository {
  async getFeed(feed: IFeed) {
    const f = await admin
    .firestore()
    .collection('profiles')
    .where("userId", "==", feed.user.userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // console.log(doc.data().posts);
          return doc.data().posts
      });
  });
  }




}
