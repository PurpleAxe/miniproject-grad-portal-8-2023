import { FeedModule as FeedDataAccessModule } from '@mp/api/feed/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FeedSagas } from './feed.sagas';
import { FeedService } from './feed.service';
import { GetFeedHandler } from './commands';
import { GetFeedEventHandler } from './events';

export const CommandHandlers = [GetFeedHandler];
export const EventHandlers = [GetFeedEventHandler];

@Module({
  imports: [CqrsModule, FeedDataAccessModule],
  providers: [FeedService, ...CommandHandlers, ...EventHandlers, FeedSagas],
  exports: [FeedService],
})
export class FeedModule {}
