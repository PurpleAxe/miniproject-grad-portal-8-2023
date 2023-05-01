import { CommentsModule as CommentsDataAccessModule } from '@mp/api/comments/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommentsSagas } from './comments.sagas';
import { CommentsService } from './comments.service';
import { UpdateCommentsHandler } from './commands';
import { UpdateCommentsEventHandler } from './events';
import { PostModule as PostDataAccesModule } from '@mp/api/post/data-access';

export const CommandHandlers = [UpdateCommentsHandler];
export const EventHandlers = [UpdateCommentsEventHandler];

@Module({
  imports: [CqrsModule, CommentsDataAccessModule, PostDataAccesModule],
  providers: [
    CommentsService,
    ...CommandHandlers,
    ...EventHandlers,
    CommentsSagas,
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
