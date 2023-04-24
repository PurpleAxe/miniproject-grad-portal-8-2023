import { FeedRepository } from '@mp/api/feed/data-access';
import { GetFeedEvent } from '@mp/api/feed/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(GetFeedEvent)
export class GetFeedEventHandler
  implements IEventHandler<GetFeedEvent>
{
  constructor(private readonly repository: FeedRepository) {}
  async handle(event: GetFeedEvent) {
    await this.repository.getFeed(event.feed);
  }
}
