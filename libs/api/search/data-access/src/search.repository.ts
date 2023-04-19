import { ISearch } from '@mp/api/search/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ISearchResponse } from '@mp/api/search/util';
import { IUser } from '@mp/api/users/util';

@Injectable()
export class SearchRepository {
  //TODO: add your functions here
  async getSearchRequest(search: ISearch) {
    console.log('getSearchRequest this called');

    const SearchResultConverter = {
      fromFirestore: (snapshot) => {
        return snapshot.data() as IUser;
      },
      toFirestore: (it: IUser) => it,
    };

    const query = await admin
      .firestore()
      .collection('users')
      .where(search.field, '==', search.keyword)
      .withConverter<IUser>(SearchResultConverter)
      .get();
    // const responseContent = query.docs.map((doc) => doc.data());
    const responseContent = query.docs.map((doc) => doc.data() as IUser);

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
      searchResults: responseContent,
    };
    console.log('!!!', dummy, '!!!');
    return dummy;
  }
}
