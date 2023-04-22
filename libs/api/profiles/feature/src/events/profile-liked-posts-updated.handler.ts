import { ProfilesRepository } from '@mp/api/profiles/data-access';
import {ProfileLikedPostUpdatedEvent} from '@mp/api/profiles/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ProfileLikedPostUpdatedEvent)
export class ProfileLikedPostUpdatedHandler
  implements IEventHandler<ProfileLikedPostUpdatedEvent>
{
  constructor(private readonly repository: ProfilesRepository) {}

  async handle(event: ProfileLikedPostUpdatedEvent) {
    await this.repository.dislikeListAdd(event.profile, event.post);
  }
}
