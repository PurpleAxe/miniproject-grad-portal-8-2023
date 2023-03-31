import { CreateUserCommand, IUser } from '@mp/api/users/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../models';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateUserCommand) {
    console.log(`${CreateUserHandler.name}`);

    const request = command.request;
    const data: IUser = {
      id: request.auth.id,
      banner: request.auth.banner,
      displayName: request.auth.displayName,
      userName: request.auth.userName,
      photoURL: request.auth.photoURL,
      email: request.auth.email,
      location: request.auth.location,
      groups: request.auth.groups,
      password: request.auth.password,
      description: request.auth.description,
      degree: request.auth.degree,
      university: request.auth.university,
      phoneNumber: request.auth.phoneNumber,
      userDepartments: request.auth.userDepartments,
      events: request.auth.events,
      posts: request.auth.posts,
      rank: request.auth.rank,
      notifications: request.auth.notifications,
      timeLeft: request.auth.timeLeft,
      followers: request.auth.followers,
      following: request.auth.following,
      conversationIDs: request.auth.conversationIDs,
      customClaims: request.auth.customClaims,
      created: request.auth.created,
    };
    const user = this.publisher.mergeObjectContext(User.fromData(data));

    user.create();
    user.commit();
  }
}
