import { CommentsRepository } from '@mp/api/comments/data-access';
import { UpdateCommentsEvent } from '@mp/api/comments/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UpdateCommentsEvent)
export class UpdateCommentsEventHandler
  implements IEventHandler<UpdateCommentsEvent>
{
  constructor(private readonly repository: CommentsRepository) {}
  async handle(event: UpdateCommentsEvent) {
    // await this.repository.getFeed(event.feed);
  }
}
