import { Injectable } from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  collection,
  query,
  where,
  getDocs,
  addDoc
} from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import {
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

  inbox$(userId: string) {
    const docRef = doc(
      this.firestore,
      `conversations/hHCuAaqg0wf6E310cosD`
    ).withConverter<IConversation []>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IConversation [];
      },
      toFirestore: (it: IConversation []) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  /*async inbox$(userId: string): Promise<IConversation[]> {
    const query = this.firestore.collection<IConversation>('conversations').where('participants', 'array-contains', userId);
    const querySnapshot = await query.get();
    const conversations = querySnapshot.docs.map((doc) => doc.data() as IConversation);
    return conversations;
  }*/

  /*inbox$(userId: string): Observable<IConversation[]> {
    const collectionRef = this.firestore.collection<IConversation>('conversations', (ref: QueryFn) => {
      return ref.where('userId', '==', userId);
    });

    return collectionRef.get().pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.data() as IConversation);
      })
    );
  }*/


  //should we setConversation, setMessage and addMessage to conversation?
  //how about we go to empty chatroom and conversation is actually created when user send the first message?
  /*async sendMessage(request: ISendMessageRequest) {
    return await httpsCallable<ISendMessageRequest, ISendMessageResponse>(
      this.functions,
      'sendMessage'
    )(request);
  }*/

  async createConversation(request: ICreateConversationRequest) {
    return await httpsCallable<
      ICreateConversationRequest,
      ICreateConversationResponse
    >(
      this.functions,
      'createConversation'
    )(request);
  }

  /*async deleteMessage(request: IDeleteMessageRequest) {
    return await httpsCallable<IDeleteMessageRequest, IDeleteMessageResponse>(
      this.functions,
      'deleteMessage'
    )(request);
  }*/

  /*async function createConversation(messages, members) {
    try {
      const newConversationRef = collection(this.firestore, 'conversations');
      const newConversation = await addDoc(newConversationRef, {
        conversationId: newConversationRef.id,
        messages,
        members,
      });
      console.log('Conversation document created with ID: ', newConversation.id);
      return newConversation;
    } catch (error) {
      console.error('Error creating conversation document: ', error);
    }
  }*/

  async getConversation(userId: string | undefined) {
    return userId != undefined ? await this.conversationQuery(userId): [];
  }
  async conversationQuery(userId: string) {
    return await getDocs(
      query(collection(this.firestore, 'conversations') , where('participants', 'array-contains', userId)) //TODO: change id to userId according to db document
    ).then((snap) => snap.docs.map((doc) => doc.data()));
  }

  async getUsers(userId: string | undefined) {
    // const auth = getAuth();
    // const user = auth.currentUser;
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
    return userId != undefined ? await this.searchQeury(userId) : [];
  }
  async searchQeury(userId: string) {
    return await getDocs(
      query(collection(this.firestore, 'users'), where('id', '!=', userId)) //TODO: change id to userId according to db document
    ).then((snap) => snap.docs.map((doc) => doc.data()));
  }
}
