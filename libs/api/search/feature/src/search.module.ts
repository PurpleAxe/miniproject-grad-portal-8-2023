import { SearchModule as SearchDataAccessModule } from '@mp/api/search/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SearchCommandHandler } from './commands';
import { SearchSagas } from './search.sagas';
import { SearchService } from './search.service';
import { SearchEventHandler } from './events';

export const CommandHandlers = [SearchCommandHandler];
export const EventHandlers = [SearchEventHandler];

@Module({
  imports: [CqrsModule, SearchDataAccessModule],
  providers: [SearchService, ...CommandHandlers, ...EventHandlers, SearchSagas],
  exports: [SearchService],
})
export class SearchModule {}
