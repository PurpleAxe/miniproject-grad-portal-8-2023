import { SearchModule as SearchDataAccessModule } from '@mp/api/search/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SearchSagas } from './search.sagas';
import { SearchService } from './search.service';

export const CommandHandlers = [];
export const EventHandlers = [];

@Module({
  imports: [CqrsModule, SearchDataAccessModule],
  providers: [SearchService, ...CommandHandlers, ...EventHandlers, SearchSagas],
  exports: [SearchService],
})
export class SearchModule {}
