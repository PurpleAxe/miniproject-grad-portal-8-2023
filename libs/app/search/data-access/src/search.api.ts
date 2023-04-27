import { Injectable } from '@angular/core';
import {
  getFirestore,
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { ISearch, ISearchRequest, ISearchResponse } from '@mp/api/search/util';

@Injectable()
export class SearchApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  // async searchOnFront(request: ISearchRequest) {
  //   // return collection('User').get().toPromise();

  //   const db = getFirestore();

  //   console.log('--------------------------------------------');
  //   const field = request.search.field;
  //   const keyword = request.search.keyword;
  //   if (field && keyword) {
  //     console.log(field,keyword,' got field and keyword')
  //     const testa = await getDocs(
  //       query(collection(db, 'users'), where(field, '==', keyword))
  //     ).then((snap) => snap.docs.map((doc) => doc.data()));
  //     console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
  //     console.log(testa);
  //     const res: ISearchResponse = {
  //       search: {
  //         field: request.search.field,
  //         keyword: request.search.keyword,
  //         searchResults: testa,
  //       },
  //     };
  //     return res.search;
  //   }
  //   console.log('field && keyword empty');
  //   const res: ISearchResponse = {
  //     search: {
  //       field: request.search.field,
  //       keyword: request.search.keyword,
  //       searchResults: [],
  //     },
  //   };
  //   return res;
  // }

  async searchUsers(request: ISearchRequest) {
    console.log('lets go');
    console.log(request);
    return await httpsCallable<
    ISearchRequest, 
    ISearchResponse
    >
    (
      this.functions,
      'searchUsers'
    )(request);
  }

  async searchPosts(request: ISearchRequest) {
    console.log('lets go');
    console.log(request);
    return await httpsCallable<
    ISearchRequest, 
    ISearchResponse
    >
    (
      this.functions,
      'searchPosts'
    )(request);
  }
}
