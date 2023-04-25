import { FeedRepository } from '@mp/api/feed/data-access';
import { GetOwnFeedEvent } from '@mp/api/feed/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(GetOwnFeedEvent)
export class GetOwnFeedEventHandler
  implements IEventHandler<GetOwnFeedEvent>
{
  constructor(private readonly repository: FeedRepository) {}
  async handle(event: GetOwnFeedEvent) {
    // await this.repository.getFeed(event.feed);
  }
}
