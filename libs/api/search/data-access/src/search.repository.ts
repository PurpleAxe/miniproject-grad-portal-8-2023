import { ISearch } from '@mp/api/search/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class SearchRepository {
  //TODO: add your functions here
  async getSearchRequest(search: ISearch) {
    const query = await admin
    .firestore()
    .collection('profile')
    .where(search.text, "==", search.field);

    query.get().then(querySnapshot => {
      let docs = querySnapshot.docs;
      for (let doc of docs) {
        console.log(`Document found at path: ${doc.ref.path}`);
      }
    });

    return ["apple"];
  }
}
