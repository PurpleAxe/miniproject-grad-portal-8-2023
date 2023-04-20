import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
// import { getAuth } from '@angular/fire/auth';
import {
  IMessage,
  IConversation,
  ICreateConversationRequest,
  ICreateConversationResponse,
  IDeleteMessageRequest,
  IDeleteMessageResponse,
  ISendMessageRequest,
  ISendMessageResponse,
} from '@mp/api/message/util';

@Injectable()
export class InboxApi {
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

  //should we setConversation, setMessage and addMessage to conversation?

  async sendMessage(request: ISendMessageRequest) {
    return await httpsCallable<ISendMessageRequest, ISendMessageResponse>(
      this.functions,
      'sendMessage'
    )(request);
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

  async deleteMessage(request: IDeleteMessageRequest) {
    return await httpsCallable<IDeleteMessageRequest, IDeleteMessageResponse>(
      this.functions,
      'deleteMessage'
    )(request);
  }

  async getUsers() {
    console.log('#######################');
    // const auth = getAuth();
    // const user = auth.currentUser;
    // console.log(user, '#######################');
    // return collection('User').get().t
    //   try {
    //     const collectionName = request.search.collectionName;
    //     let field = request.search.field;
    //     const keyword = request.search.keyword;

    //     if (collectionName && keyword) {
    //       if (field.length > 0) {
    //         field = this.getFieldName(field);
    //         const queryResult = await this.searchQeury(
    //           collectionName,
    //           keyword,
    //           field
    //         );
    //         res.search.searchResults = queryResult;
    //         return res.search;
    //       } else {
    //         throw new Error('filed is empty');
    //       }
    //     } else {
    //       throw new Error('collection name or keyword not set');
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     res.search.searchResults = err;
    //     return res.search;
    //   }
    return 'a';
  }
}
