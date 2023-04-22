import { ProfilesRepository } from '@mp/api/profiles/data-access';
import {ProfileLikedPostUpdatedEvent} from '@mp/api/profiles/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ProfileLikedPostUpdatedEvent)
export class ProfileLikedPostUpdatedHandler
  implements IEventHandler<ProfileLikedPostUpdatedEvent>
{
  constructor(private readonly repository: ProfilesRepository) {}

  async handle(event: ProfileLikedPostUpdatedEvent) {
    if (event.remove) {
      await this.repository.dislikeListRemove(event.profile, event.post);
    } else {
      await this.repository.dislikeListAdd(event.profile, event.post);
    }
  }
}
