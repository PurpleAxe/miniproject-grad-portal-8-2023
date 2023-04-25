import { FeedModule as FeedDataAccessModule } from '@mp/api/feed/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FeedSagas } from './feed.sagas';
import { FeedService } from './feed.service';
import { GetOwnFeedHandler, GetHomeFeedHandler, GetDiscoveryFeedHandler } from './commands';
import { GetOwnFeedEventHandler } from './events';

export const CommandHandlers = [GetOwnFeedHandler, GetHomeFeedHandler, GetDiscoveryFeedHandler];
export const EventHandlers = [GetOwnFeedEventHandler];

@Module({
  imports: [CqrsModule, FeedDataAccessModule],
  providers: [FeedService, ...CommandHandlers, ...EventHandlers, FeedSagas],
  exports: [FeedService],
})
export class FeedModule {}
