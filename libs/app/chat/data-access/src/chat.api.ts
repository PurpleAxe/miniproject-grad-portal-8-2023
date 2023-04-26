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
    // if (userId) {
    // const queryConversationList = query(
    //   collection(this.firestore, 'conversations'),
    //   where('membersID', 'array-contains-any', [userId])
    // ); //TODO: change id to userId according to db document,//TODO change this to query Profile/conversationIDs
    console.log(conversationID, 'conversationID!!!!!!!!!!!!!!asdas');
    // if (conversationID) {
    const queryConversationList = query(
      collection(this.firestore, 'conversations'),
      where('conversationID', '==', conversationID)
    );
    onSnapshot(queryConversationList, (doc) => {
      observer.next(
        doc.docChanges().map((change) => {
          console.log(change.type, 'change messages type!!!!!!!!!!');
          // if (change.type == 'added' || change.type == 'modified') {
          console.log(change.doc.data()['messages'], ' added messages');
          // const message=

          return {
            type: change.type,
            messages: change.doc.data()['messages'],
          };
        })
      );
    });
    // }
    // let tmp;
    // const unsubscribe = this.conversations$.subscribe((x: any) => {
    //   tmp = x;
    // });

    // console.log(tmp);
    // unsubscribe.ubsubscribe();
    //   observer.next(
    //     snapshot.docChanges().map((change) => {
    //       // if (change.type === 'added') {
    //       // console.log(this.conversations$);
    //       console.log(change.type, 'change type!!!!!!!!!!');
    //       // if (change.type == 'added' || change.type == 'modified') {
    //       console.log('added conversation');
    //       const members = this.swap(change.doc.data()['members'], userId);
    //       const membersID = this.swap(change.doc.data()['membersID'], userId);

    //       const conversation = {
    //         conversationID: change.doc.data()['conversationID'],
    //         messages: change.doc.data()['messages'],
    //         members: members,
    //         membersID: membersID,
    //       };

    //       return { type: change.type, conversations: conversation };
    //     })
    //   );

    // });
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

  /*async getMessages(userId: string | undefined) {
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
   async searchQeury() {
     // const userDepartments = profile.userDepartments;
     return await getDocs(
       query(
         collection(this.firestore, 'profiles'),
         where('userDepartments', 'array-contains-any', 'curruserDepartments')
       )
     ).then((snap) => snap.docs.map((doc) => doc.data()));
   }*/
}
