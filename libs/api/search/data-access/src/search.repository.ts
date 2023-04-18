import { ISearch } from '@mp/api/search/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class SearchRepository {
  //TODO: add your functions here
  async getSearchRequest(search: ISearch) {
    const query = await admin
      .firestore()
      .collection('user')
      // .where(search.text, "==", search.field);
      .where(search.field, '==', search.keyword);

    query.get().then((querySnapshot) => {
      const docs = querySnapshot.docs;
      for (const doc of docs) {
        console.log(`Document found at path: ${doc.ref.path}`);
      }
    });

    var dummy: ISearch = {keyword: "", field: "", result: ["name"]}
    return dummy
  }
}
