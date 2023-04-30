import { Injectable } from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
// import { getAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import {
  IMessage,
  IConversation,
  IDeleteMessageRequest,
  IDeleteMessageResponse,
  ISendMessageRequest,
  ISendMessageResponse,
} from '@mp/api/message/util';

@Injectable()
export class ChatApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  conversation$(id: string) {
    const docRef = doc(
      this.firestore,
      `conversations/${id}`
    ).withConverter<IConversation>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IConversation;
      },
      toFirestore: (it: IConversation) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  async chat(
    conversationID: string | undefined | null,
    observer: Subject<any>
  ) {
    // console.log(conversationID, 'conversationID!!!!!!!!!!!!!!asdas');
    const queryConversationList = query(
      collection(this.firestore, 'conversations'),
      where('conversationID', '==', conversationID)
    );
    onSnapshot(queryConversationList, (doc) => {
      observer.next(
        doc.docChanges().map((change) => {
          // console.log(change.type, 'change messages type!!!!!!!!!!');
          // console.log(change.doc.data()['messages'], ' added messages');
          return {
            conversationID: conversationID,
            type: change.type,
            messages: change.doc.data()['messages'],
          };
        })
      );
    });
  }
  async sendMessage(request: ISendMessageRequest) {
    return await httpsCallable<ISendMessageRequest, ISendMessageResponse>(
      this.functions,
      'sendMessage'
    )(request);
  }

  async deleteMessage(request: IDeleteMessageRequest) {
    return await httpsCallable<IDeleteMessageRequest, IDeleteMessageResponse>(
      this.functions,
      'deleteMessage'
    )(request);
  }
}
