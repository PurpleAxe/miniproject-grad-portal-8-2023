import { IConversation } from '@mp/api/message/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

@Injectable()
export class MessageRepository {
  async getMessage(msg: IConversation) {
    // TODO Placeholder feature
    return await admin
      .firestore()
      .collection('conversations')
      .withConverter<IConversation>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IConversation;
        },
        toFirestore: (it: IConversation) => it,
      })
      .doc(msg.conversationID!)
      .get();
  }

  async sendMessage(message: IConversation) {
    console.log(message, 'lkdasdaskdkddddddddddddddddddddddddddddddddddd');
    // const arrayToUpdate = admin.firestore.FieldValue.arrayUnion({
    //   messages: message.messages,
    // });
    // console.log(arrayToUpdate);
    return await admin
      .firestore()
      .collection('conversations')
      .doc(message.conversationID!)
      .update({
        messages: FieldValue.arrayUnion(message.messages?.at(0)),
      }); // TODO decide if this should be a different intput usign a specific request for sending single messages using a new interface.
  }

  async deleteMessage(message: IConversation) {
    // Remove password field if present
    return await admin
      .firestore()
      .collection('conversations')
      .doc(message.conversationID!)
      .update({
        messages: FieldValue.arrayRemove(message.messages?.at(0)),
      });
  }

  async createConversation(conversation: IConversation) {
    console.log(conversation);
    return await admin
      .firestore()
      .collection('conversations')
      .doc(conversation.conversationID!)
      .set(conversation);
  }
}
