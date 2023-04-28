import { ISearch } from '@mp/api/search/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ISearchResponse } from '@mp/api/search/util';
import { IUser } from '@mp/api/users/util';
import { IProfile } from '@mp/api/profiles/util';
import { IPost } from '@mp/api/post/util';

@Injectable()
export class SearchRepository {
  //TODO: add your functions here
  async get_document(id: string, collection: string) {
    let response = null;
    const f = await admin.firestore().collection(collection).doc(id).get();
    response = f.data();
    return response;
  }

  async get_collection(collection) {
    const snapshot = await admin.firestore().collection(collection).get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async search_for(
    key: string,
    value: any,
    collection: string
  ): Promise<IProfile[] | IPost[]> {
    const response = [];
    const f = await admin
      .firestore()
      .collection(collection)
      .where(key, '>=', value)
      .where(key, '<=', value + "\uf8ff")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          response.push(doc.data());
        });
      });
    return response;
  }

  async get(key: string, value: any, collection: string) {
    let response = null;
    const f = await admin
      .firestore()
      .collection(collection)
      .where(key, '==', value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          response = doc.data();
        });
      });
    return response;
  }
}
