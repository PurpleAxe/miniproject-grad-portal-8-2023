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
  
}
