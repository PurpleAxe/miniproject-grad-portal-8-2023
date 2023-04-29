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
    log(ProfileLikedPostUpdatedHandler)
    if (event.remove) {
      await this.repository.likeListRemove(event.profile, event.post);
    } else {
      await this.repository.likeListAdd(event.profile, event.post);
    }
  }
}
