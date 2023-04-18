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

  async search1(request: ISearchRequest) {
    // return collection('User').get().toPromise();

    const db = getFirestore();

    console.log('--------------------------------------------');
    const testa = await getDocs(
      query(collection(db, 'users'), where('email', '==', 'zz@zz.com'))
    ).then((snap) => snap.docs.map((doc) => doc.data()));
    console.log('--------------------------------------------');
    console.log(testa);
    return testa;
  }
  async search(request: ISearchRequest) {
    // return collection('User').get().toPromise();
    return await httpsCallable<ISearchRequest, ISearchResponse>(
      this.functions,
      'search'
    )(request);
    // const db = getFirestore();

    // console.log('--------------------------------------------');
    // const testa = await getDocs(
    //   query(collection(db, 'users'), where('email', '==', 'zz@zz.com'))
    // ).then((snap) => snap.docs.map((doc) => doc.data()));
    // console.log('--------------------------------------------');
    // console.log(testa);
    // return testa;
  }
}
