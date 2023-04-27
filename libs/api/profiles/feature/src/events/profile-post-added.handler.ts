import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { ProfilePostAddedEvent } from '@mp/api/profiles/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ProfilePostAddedEvent)
export class ProfilePostAddedHandler
  implements IEventHandler<ProfilePostAddedEvent>
{
  constructor(private readonly repository: ProfilesRepository) {}

  async handle(event: ProfilePostAddedEvent) {
    console.log(`${ProfilePostAddedHandler.name}`);
    await this.repository.addPost(event.profile, event.post);
  }
}
