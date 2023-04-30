import { ProfilesRepository } from '@mp/api/profiles/data-access';
import {ProfileLikedPostUpdatedEvent} from '@mp/api/profiles/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {log} from 'console';

@EventsHandler(ProfileLikedPostUpdatedEvent)
export class ProfileLikedPostUpdatedHandler
  implements IEventHandler<ProfileLikedPostUpdatedEvent>
{
  constructor(private readonly repository: ProfilesRepository) {}

  async handle(event: ProfileLikedPostUpdatedEvent) {
    log(`${ProfileLikedPostUpdatedHandler.name} - ${event.post}`)
    if (event.remove) {
      this.repository.likeListRemove(event.profile, event.post);
    } else {
      this.repository.likeListAdd(event.profile, event.post);
    }
  }
}
