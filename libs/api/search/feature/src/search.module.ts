import { SearchModule as SearchDataAccessModule } from '@mp/api/search/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SearchUsersCommandHandler, SearchPostsCommandHandler, SearchEventsCommandHandler } from './commands';
import { SearchSagas } from './search.sagas';
import { SearchService } from './search.service';
import { SearchEventHandler } from './events';

export const CommandHandlers = [SearchUsersCommandHandler, SearchPostsCommandHandler, SearchEventsCommandHandler];
export const EventHandlers = [SearchEventHandler];

@Module({
  imports: [CqrsModule, SearchDataAccessModule],
  providers: [SearchService, ...CommandHandlers, ...EventHandlers, SearchSagas],
  exports: [SearchService],
})
export class SearchModule {}
