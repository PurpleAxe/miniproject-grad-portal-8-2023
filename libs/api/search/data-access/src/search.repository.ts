import { ISearch } from '@mp/api/search/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class SearchRepository {
  //TODO: add your functions here
  async getSearchRequest(search: ISearch) {
    return await admin
      .firestore()
      .collection('users')
      .doc(search.text)
      .create(search);
  }
}
