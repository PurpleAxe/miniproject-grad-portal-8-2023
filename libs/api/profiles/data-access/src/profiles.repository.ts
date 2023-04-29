import { IProfile } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ProfilesRepository {
  async findOne(profile: IProfile) {
    return await admin
      .firestore()
      .collection('profiles')
      .withConverter<IProfile>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IProfile;
        },
        toFirestore: (it: IProfile) => it,
      })
      .doc(profile.userId)
      .get();
  }

  async createProfile(profile: IProfile) {
    // Remove password field if present
    delete profile.accountDetails?.password;

    return await admin
      .firestore()
      .collection('profiles')
      .doc(profile.userId)
      .create(profile);
  }

  async updateProfile(profile: IProfile) {
    // Remove password field if present
    delete profile.accountDetails?.password;
    return await admin
      .firestore()
      .collection('profiles')
      .doc(profile.userId)
      .set(profile, { merge: true });
  }

  async getProfilesCollection() {
    const snapshot = await admin.firestore().collection('profiles').get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async updateConversationList(profile: IProfile) {
    console.log(profile.conversationIDs?.at(0));
    const conversationIDs: string = profile.conversationIDs?.at(0);
    return await admin
      .firestore()
      .collection('profiles')
      .doc(profile.userId!)
      .collection('conversationIDs')
      .doc(conversationIDs)
      .create({});
  }
}
