import { IUser, UserCreatedEvent } from '@mp/api/users/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';

export class User extends AggregateRoot implements IUser {
  constructor(
    public id: string,
    public banner?: string,
    public displayName?: string | null | undefined,
    public userName?: string | null | undefined,
    public photoURL?: string | null | undefined,
    public email?: string | null | undefined,
    public location?: string,
    public groups?: [key: string],
    public password?: string | null,
    public description?: string,
    public degree?: string,
    public university?: string,
    public phoneNumber?: string | null | undefined,
    public userDepartments?: [key: string],
    public events?: [key: string],
    public posts?: [key: string],
    public rank?: number,
    public notifications?: [key: string],
    public timeLeft?: number,
    public followers?: [key: string],
    public following?: [key: string],
    public conversationIDs?: [key: string],
    public customClaims?: { [key: string]: any } | null | undefined,
    public created?: Timestamp | null | undefined,
  ) {
    super();
  }

  static fromData(user: IUser): User {
    const instance = new User(
      user.id,
      user.banner,
      user.displayName,
      user.userName,
      user.photoURL,
      user.email,
      user.location,
      user.groups,
      user.password,
      user.description,
      user.degree,
      user.university,
      user.phoneNumber,
      user.userDepartments,
      user.events,
      user.posts,
      user.rank,
      user.notifications,
      user.timeLeft,
      user.followers,
      user.following,
      user.conversationIDs,
      user.customClaims,
      user.created,
    );
    return instance;
  }

  create() {
    this.apply(new UserCreatedEvent(this.toJSON()));
  }

  toJSON(): IUser {
    return {
      id: this.id,
      banner: this.banner,
      displayName: this.displayName,
      userName: this.userName,
      photoURL: this.photoURL,
      email: this.email,
      location: this.location,
      groups: this.groups,
      password: this.password,
      description: this.description,
      degree: this.degree,
      university: this.university,
      phoneNumber: this.phoneNumber,
      userDepartments: this.userDepartments,
      events: this.events,
      posts: this.posts,
      rank: this.rank,
      notifications: this.notifications,
      timeLeft: this.timeLeft,
      followers: this.followers,
      following: this.following,
      conversationIDs: this.conversationIDs,
      customClaims: this.customClaims,
      created: this.created,
    };
  }
}
