import { Injectable } from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
} from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { getDoc } from '@firebase/firestore';
import {
  IConversation,
  ICreateConversationRequest,
  ICreateConversationResponse,
  IDeleteMessageRequest,
  IDeleteMessageResponse,
  ISendMessageRequest,
  ISendMessageResponse,
} from '@mp/api/message/util';
import { Subject } from 'rxjs';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';
import { GetConversation } from '../../util/src/inbox.actions';
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
  // async getMembers(userId: string | undefined, change: any) {
  //   console.log(change, ' change');
  //   // const members = change.doc.data()['participants'];
  //   const members = change['participants'];
  //   // const otherMemberId = members.find((m: any) => {
  //   const otherMemberId = members.find((m: any) => {
  //     return m.id !== userId;
  //   });
  //   const docRef = doc(this.firestore, 'users', otherMemberId);
  //   const docSnap = await getDoc(docRef);
  //   const data = docSnap.data();
  //   const member = {
  //     id: data == undefined ? null : data['id'],
  //     photoURL: data == undefined ? null : data['photoURL'],
  //     displayName: data == undefined ? null : data['displayName'],
  //   };
  //   const me = {
  //     id: userId,
  //   };
  //   const conversation = {
  //     conversationId: change['conversationId'],
  //     messages: change['messages'],
  //     participants: [member, me],
  //     // participants: change.doc.data()['participants'],
  //   };
  //   console.log(conversation, 'qqqqqqqqqqqqqqq');
  //   return conversation;
  // }
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
    // if (userId) {
    const queryConversationList = query(
      collection(this.firestore, 'conversations'),
      where('membersID', 'array-contains-any', [userId])
    ); //TODO: change id to userId according to db document,//TODO change this to query Profile/conversationIDs

    // this.conversations$ = new Observable<any>((observer) => {
    // this.conversations$ = new Observable<any>((observer) => {
    onSnapshot(queryConversationList, (snapshot) => {
      // let tmp;
      // const unsubscribe = this.conversations$.subscribe((x: any) => {
      //   tmp = x;
      // });

      // console.log(tmp);
      // unsubscribe.ubsubscribe();
      observer.next(
        snapshot.docChanges().map((change) => {
          // if (change.type === 'added') {
          // console.log(this.conversations$);
          console.log('added conversation');
          const members = this.swap(change.doc.data()['members'], userId);
          const membersID = this.swap(change.doc.data()['membersID'], userId);

          const conversation = {
            conversationID: change.doc.data()['conversationID'],
            messages: change.doc.data()['messages'],
            members: members,
            membersID: membersID,
          };
          return conversation;
          // this.conversations$.pipe(
          //   tap((x: any) => {
          //     console.log(x, 'xxxxxxxxxxxxxxxxxxxx');
          //     x.push(conversation);
          //   })
          // );

          // return conversation;
          // this.conversations$.push(conversation);
          // } else if (change.type === 'removed') {
          //   console.log('removed conversation');

          //   this.conversations$.pipe(
          //     tap((x: any) => {
          //       x.splice(
          //         x.findIndex(
          //           (item: any) =>
          //             item.conversationID ===
          //             change.doc.data()['conversationID']
          //         ),
          //         1
          //       );
          //     })
          //   );

          //   // return this.conversations$;
          // } else {
          //   console.log('updated conversation');
          //   const ind = this.conversations$.findIndex(
          //     (item: any) =>
          //       item.conversationID === change.doc.data()['conversationID']
          //   );

          //   const members = this.swap(change.doc.data()['members'], userId);
          //   const membersID = this.swap(
          //     change.doc.data()['membersID'],
          //     userId
          //   );

          //   const conversation = {
          //     conversationID: change.doc.data()['conversationID'],
          //     messages: change.doc.data()['messages'],
          //     members: members,
          //     membersID: membersID,
          //   };
          //   this.conversations$.pipe(
          //     tap((x: any) => {
          //       this.conversations$[ind] = conversation;
          //     })
          //   );

          // return conversation;
          // }
          // return this.conversations$;
        })
      );

      // snapshot
      // );
    });
  }
  // );
  // }
  // const empty$ = [];
  // return empty$;

  // const docRef = doc(
  //   this.firestore,
  //   `conversations/hHCuAaqg0wf6E310cosD`
  // ).withConverter<IConversation[]>({
  //   fromFirestore: (snapshot) => {
  //     return snapshot.data() as IConversation[];
  //   },
  //   toFirestore: (it: IConversation[]) => it,
  // });
  // return docData(docRef, { idField: 'id' });

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

  // async getConversation(userId: string | undefined) {
  //   return userId != undefined ? await this.conversationQuery(userId) : [];
  // }
  // async conversationQuery(userId: string) {
  //   return await getDocs(
  //     query(
  //       collection(this.firestore, 'conversations'),
  //       where('participants', 'array-contains', userId)
  //     ) //TODO: change id to userId according to db document
  //   ).then((snap) => snap.docs.map((doc) => doc.data()));
  // }

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
  // async getMembersId(membersId: any[]) {
  //   // const auth = getAuth();
  //   // const user = auth.currentUser;
  //   //   try {
  //   //     const collectionName = request.search.collectionName;
  //   //     let field = request.search.field;
  //   //     const keyword = request.search.keyword;

  //   //     if (collectionName && keyword) {
  //   //       if (field.length > 0) {
  //   //         field = this.getFieldName(field);
  //   //         const queryResult = await this.searchQeury(
  //   //           collectionName,
  //   //           keyword,
  //   //           field
  //   //         );
  //   //         res.search.searchResults = queryResult;
  //   //         return res.search;
  //   //       } else {
  //   //         throw new Error('filed is empty');
  //   //       }
  //   //     } else {
  //   //       throw new Error('collection name or keyword not set');
  //   //     }
  //   //   } catch (err) {
  //   //     console.log(err);
  //   //     res.search.searchResults = err;
  //   //     return res.search;
  //   //   }
  //   return membersId != undefined ? await this.searchMemQeury(membersId) : [];
  // }
  // async searchMemQeury(membersId: any[]) {
  //   return await getDocs(
  //     query(
  //       collection(this.firestore, 'users'),
  //       where('id', 'array-contains', membersId)
  //     ) //TODO: change id to userId according to db document
  //   ).then((snap) => snap.docs.map((doc) => doc.data()));
  // }
}
