import {
  CreateProfileCommand,
  IProfile,
  ProfileStatus,
} from '@mp/api/profiles/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { Profile } from '../models';
import { timeStamp } from 'console';

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(private publisher: EventPublisher) {}
  //remove this before merge, this is only for testing TH-0003---Chat
  async execute(command: CreateProfileCommand) {
    console.log(`${CreateProfileHandler.name}`);

    const request = command.request;
    const userId = request.user.id;
    const email = request.user.email;
    const displayName = email?.split('@')[0];
    const photoURL = request.user.photoURL;
    const cellphone = request.user.phoneNumber;

    const data: IProfile = {
      userId,
      accountDetails: {
        displayName,
        email,
        photoURL,
        status: ProfileStatus.INCOMPLETE,
      },
      personalDetails: {
        age: null,
        gender: null,
        ethnicity: null,
        status: ProfileStatus.INCOMPLETE,
      },
      contactDetails: {
        cellphone,
        status: ProfileStatus.INCOMPLETE,
      },
      addressDetails: {
        residentialArea: null,
        workArea: null,
        status: ProfileStatus.INCOMPLETE,
      },
      occupationDetails: {
        householdIncome: null,
        occupation: null,
        status: ProfileStatus.INCOMPLETE,
      },
      status: ProfileStatus.INCOMPLETE,
      created: Timestamp.fromDate(new Date()),
      banner: '',
      userName: email?.split('@')[0],
      location: '',
      groups: [],
      description: 'I AM WHO I AM',
      degree: 'Bsc CS',
      university: 'University of Pretoria',
      userDepartments: ['Computer Science, Chemistry, Civil Engineering'],
      events: [],
      posts: [],
      rank: 1,
      notifications: [],
      timeLeft: Timestamp.fromDate(new Date(Date.now() + 2 * 60 * 60 * 24* 1000)),
      followers: [],
      following: [],
      conversationIDs: [],
    };
    const profile = this.publisher.mergeObjectContext(Profile.fromData(data));
    profile.create();
    profile.commit();
  }
  // async execute(command: CreateProfileCommand) {
  //   console.log(`${CreateProfileHandler.name}`);

  //   const request = command.request;
  //   const userId = request.user.id;
  //   const displayName = request.user.displayName;
  //   const email = request.user.email;
  //   const photoURL = request.user.photoURL;
  //   const cellphone = request.user.phoneNumber;

  //   const data: IProfile = {
  //     userId,
  //     accountDetails: {
  //       displayName,
  //       email,
  //       photoURL,
  //       status: ProfileStatus.INCOMPLETE,
  //     },
  //     personalDetails: {
  //       age: null,
  //       gender: null,
  //       ethnicity: null,
  //       status: ProfileStatus.INCOMPLETE,
  //     },
  //     contactDetails: {
  //       cellphone,
  //       status: ProfileStatus.INCOMPLETE,
  //     },
  //     addressDetails: {
  //       residentialArea: null,
  //       workArea: null,
  //       status: ProfileStatus.INCOMPLETE,
  //     },
  //     occupationDetails: {
  //       householdIncome: null,
  //       occupation: null,
  //       status: ProfileStatus.INCOMPLETE,
  //     },
  //     status: ProfileStatus.INCOMPLETE,
  //     created: Timestamp.fromDate(new Date()),
  //   };
  //   const profile = this.publisher.mergeObjectContext(Profile.fromData(data));

  //   profile.create();
  //   profile.commit();
  // }
}
