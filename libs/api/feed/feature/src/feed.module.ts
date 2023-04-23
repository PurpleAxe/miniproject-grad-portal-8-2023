import { FeedModule as FeedDataAccessModule } from '@mp/libs/feed/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FeedSagas } from './feed.sagas';
import { FeedService } from './feed.service.ts';

export const CommandHandlers = [];
export const EventHandlers = [];

@Module({
  imports: [CqrsModule, FeedDataAccessModule],
  providers: [FeedService, ...CommandHandlers, ...EventHandlers, FeedSagas],
  exports: [FeedService],
})
export class FeedModule {}
