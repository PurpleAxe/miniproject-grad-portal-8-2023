import { ISearch } from '@mp/api/search/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ISearchResponse } from '@mp/api/search/util';

@Injectable()
export class SearchRepository {
  //TODO: add your functions here
  async getSearchRequest(search: ISearch) {
    console.log('getSearchRequest this called');
    // const SearchResultConverter = {
    //   toFirestore(post: ISearchResponse): firebase.firestore.DocumentData {
    //     return { title: post.title, author: post.author };
    //   },
    //   fromFirestore(
    //     snapshot: firebase.firestore.QueryDocumentSnapshot,
    //     options: firebase.firestore.SnapshotOptions
    //   ): ISearchResponse {
    //     const data = snapshot.data(options)!;
    //     return new ISearchResponse(data.title, data.author);
    //   },
    // };

    const query = await admin
      .firestore()
      .collection('users')
      // .where(search.text, "==", search.field);
      .where(search.field, '==', search.keyword)
      // .withConverter()
      .get();
    const responseContent = query.docs.map((doc) => doc.data());
    console.log(responseContent);
    // let res = [{ any: 'No data' }];
    // await query.get().then((querySnapshot) => {
    //   const docs = querySnapshot.docs;

    //   for (const doc of docs) {
    //     console.log(`Document found: ${doc.data()}`);
    //     console.log(`Document found at path: ${doc.ref.path}`);
    //   }
    //   const responseContent = docs.map((doc) => doc.data());
    //   console.log(responseContent, '***************');
    //   res = responseContent;
    // });
    // console.log('query didnt find anything');
    const dummy: ISearch = {
      field: search.field,
      keyword: search.keyword,
      result: responseContent,
    };
    return dummy;
  }
}
