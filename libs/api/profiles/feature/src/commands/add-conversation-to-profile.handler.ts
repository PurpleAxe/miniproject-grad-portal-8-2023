import {
    AddConversationToProfileCommand, IProfile
} from '@mp/api/profiles/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Profile } from '../models';

@CommandHandler(AddConversationToProfileCommand)
export class AddConversationToProfileHandler
  implements
    ICommandHandler<AddConversationToProfileCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AddConversationToProfileCommand) {
    console.log(`${AddConversationToProfileHandler.name}`);

    const request = command.request;
    for (let i = 0, len = request.members!.length; i < len; i++) {
      const id:string = request.members!.at(i)!.id!;
      const conversation:string  = request.conversationID!;
      const toAdd:IProfile ={
          "userId" : id,
          "conversationIDs" : [conversation]
        };
      const profile = this.publisher.mergeObjectContext(
        Profile.fromData(toAdd)
      );
      profile.updateConversationList();
      profile.commit();
    }
  }
}
