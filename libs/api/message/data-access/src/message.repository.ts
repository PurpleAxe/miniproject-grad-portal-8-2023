import { IConversation } from '@mp/api/message/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class MessageRepository {
  async getMessage(msg : IConversation) { // TODO Placeholder feature
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
    return await admin
      .firestore()
      .collection('conversations')
      .doc(message.conversationID!)
      .update({
	  messages : admin.firestore.FieldValue.arrayUnion(message.messages!.at(0))
      }) // TODO decide if this should be a different intput usign a specific request for sending single messages using a new interface.
  }

  async deleteMessage(message: IConversation) {
    // Remove password field if present
    return await admin
      .firestore()
      .collection('conversations')
      .doc(message.conversationID!)
      .update({
	  messages : admin.firestore.FieldValue.arrayRemove(message.messages)
      })
  }

  async createConversation(conversation: IConversation) {
    return await admin
      .firestore()
      .collection("conversations")
      .doc(conversation.conversationID!)
      .set(conversation)
  }

  async getProfilesCollection() {
    const snapshot = await admin.firestore().collection('profiles').get()
    return snapshot.docs.map(doc => doc.data());
  }
}
