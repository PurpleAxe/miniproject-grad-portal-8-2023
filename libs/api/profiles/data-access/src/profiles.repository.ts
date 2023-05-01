import {IPost} from '@mp/api/post/util';
import { IProfile } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import {log} from 'console';
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

  async getLiked(profile:string):Promise<string[]> {
    log(profile);
    return admin
      .firestore()
      .collection("profiles")
      .doc(profile)
      .collection("likedPosts")
      .get().then((snap) => {
        const docs:string[] = [];
        snap.forEach((doc) => {
          docs.push(doc.id);
        })
        return docs;
      })
  }

  async getDisliked(profile:string):Promise<string[]> {
    return admin
      .firestore()
      .collection("profiles")
      .doc(profile)
      .collection("dislikedPosts")
      .get().then((snap) => {
        const docs:string[] = [];
        snap.forEach((doc) => {
          docs.push(doc.id);
        })
        return docs;
      })
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
    const conversationIDs = profile.conversationIDs?.at(0);
    return await admin
      .firestore()
      .collection('profiles')
      .doc(profile.userId!)
      .collection('conversationIDs')
      .doc(conversationIDs!)
      .create({});
  }
  async likeListAdd(profile:string, post:string) {
    admin
      .firestore()
      .collection("profiles")
      .doc(profile)
      .collection("likedPosts")
      .doc(post).set({post:post});
  }

  async likeListRemove(profile:string, post:string) {
    log(post);
    log(profile);
    admin
      .firestore()
      .collection("profiles")
      .doc(profile)
      .collection("likedPosts")
      .doc(post).delete();
  }
  async dislikeListAdd(profile:string, post:string) {
    admin
      .firestore()
      .collection("profiles")
      .doc(profile)
      .collection("dislikedPosts")
      .doc(post).create({});
  }

  async dislikeListRemove(profile:string, post:string) {
    admin
      .firestore()
      .collection("profiles")
      .doc(profile)
      .collection("dislikedPosts")
      .doc(post).delete();
  }

  async addPost(profile:string, post:IPost) {
    admin
      .firestore()
      .collection("profiles")
      .doc(profile)
      .collection("posts")
      .doc(post.postId!).create({});
  }
}
