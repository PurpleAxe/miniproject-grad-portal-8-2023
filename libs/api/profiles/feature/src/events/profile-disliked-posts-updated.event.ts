import { ProfilesRepository } from '@mp/api/profiles/data-access';
import {ProfileDislikedPostsUpdatedEvent} from '@mp/api/profiles/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ProfileDislikedPostsUpdatedEvent)
export class ProfileDislikedPostHandler
  implements IEventHandler<ProfileDislikedPostsUpdatedEvent>
{
  constructor(private readonly repository: ProfilesRepository) {}

  async handle(event: ProfileDislikedPostsUpdatedEvent) {
    await this.repository.dislikeListAdd(event.profile, event.post);
  }
}
