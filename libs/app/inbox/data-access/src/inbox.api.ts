import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import {
  ICreateConversationRequest,
  ICreateConversationResponse,
} from '@mp/api/message/util';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable()
export class InboxApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}
  private conversations$: any;

  getConversationObs(): Observable<any> {
    return this.conversations$;
  }

  swap(src: any, subject: string | undefined): any {
    const res = src;
    if (res[0]['id'] !== subject) {
      const temp = res[0];
      res[0] = res[1];
      res[1] = temp;
    }
    return res;
  }
  async inbox(userId: string | undefined, observer: Subject<any>) {
    const queryConversationList = query(
      collection(this.firestore, 'conversations'),
      where('membersID', 'array-contains-any', [userId])
    );
    onSnapshot(queryConversationList, (snapshot) => {
      observer.next(
        snapshot.docChanges().map((change) => {
          const members = this.swap(change.doc.data()['members'], userId);
          const membersID = this.swap(change.doc.data()['membersID'], userId);

          const conversation = {
            conversationID: change.doc.data()['conversationID'],
            messages: change.doc.data()['messages'],
            members: members,
            membersID: membersID,
          };

          return { type: change.type, conversations: conversation };
        })
      );
    });
  }

  async createConversation(request: ICreateConversationRequest) {
    return await httpsCallable<
      ICreateConversationRequest,
      ICreateConversationResponse
    >(
      this.functions,
      'createConversation'
    )(request);
  }

  async getUsers(userId: string | undefined) {
    return userId != undefined ? await this.searchQeury(userId) : [];
  }
  async searchQeury(userId: string) {
    return await getDocs(
      query(collection(this.firestore, 'users'), where('id', '!=', userId)) //TODO: change id to userId according to db document
    ).then((snap) => snap.docs.map((doc) => doc.data()));
  }
}
