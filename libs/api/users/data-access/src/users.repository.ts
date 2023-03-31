import { IUser } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersRepository {
  async createUser(user: IUser) {
    return await admin
      .firestore()
      .collection('users')
      .doc(user.id)
      .create({
        id: user.id,
        banner: "",
        displayName: user.displayName,
        userName: "",
        photoURL: user.photoURL,
        email: user.email,
        location: "",
        groups: [],
        password: user.password,
        description: "",
        degree: "",
        university: "",
        phoneNumber: user.phoneNumber,
        userDepartments: [],
        events: [],
        posts: [],
        rank: -1,
        notifications: [],
        timeLeft: 0,
        followers: [],
        following: [],
        conversationIDs: [],
        customClaims: user.customClaims,
        created: user.created,
      });
  }
}
