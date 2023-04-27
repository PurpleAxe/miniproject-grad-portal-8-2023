import { PostsRepository } from '@mp/api/post/data-access';
import { UpdateCommentsEvent } from '@mp/api/comments/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UpdateCommentsEvent)
export class UpdateCommentsEventHandler
  implements IEventHandler<UpdateCommentsEvent>
{
  constructor(private readonly repository: PostsRepository) {}
  async handle(event: UpdateCommentsEvent) {
    await this.repository.postComment(event.comment);
  }
}
