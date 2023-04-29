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
  async likeListAdd(profile:string, post:string) {
    log("fuck" + post)
    admin
      .firestore()
      .collection("profiles")
      .doc(profile)
      .collection("likedPosts")
      .doc(post).create({});
  }

  async likeListRemove(profile:string, post:string) {
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
