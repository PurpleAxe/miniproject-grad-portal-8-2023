import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { ConversationAddedEvent } from '@mp/api/profiles/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ConversationAddedEvent)
export class ConversationAddedHandler
  implements IEventHandler<ConversationAddedEvent>
{
  constructor(private readonly repository: ProfilesRepository) {}

  async handle(event: ConversationAddedEvent) {
    console.log(`${ConversationAddedHandler.name}`);
    await this.repository.updateConversationList(event.profile);
  }
}
