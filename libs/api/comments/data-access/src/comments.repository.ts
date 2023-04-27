import { IComment } from '@mp/api/comments/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class CommentsRepository {
  //TODO: add your functions here
  async search_for(key: string, value: any, collection: string): Promise<[]> {
    var response = null;
    const f = await admin
    .firestore()
    .collection(collection)
    .where(key, "==", value)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        response = doc.data().comments;
      });
    });
    return response;
  }

  async get_comments(commentIds: IComment[]): Promise<IComment[]> {
    var commentCollection = await this.get_collection("comment");
    var comments = [];
    for(var commentId of commentIds) {
      for(var commentObject of commentCollection) {
        if(commentId == commentObject.commentId)
          comments.push(commentObject);
      }
    }
    return comments;
  }

  async get_collection(collection) {
    const snapshot = await admin.firestore().collection(collection).get()
    return snapshot.docs.map(doc => doc.data());
  }
  
}
