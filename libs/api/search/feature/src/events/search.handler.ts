import { SearchRepository } from '@mp/api/search/data-access';
import { SearchEvent } from '@mp/api/search/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SearchEvent)
export class SearchHandler implements IEventHandler<SearchEvent> {
  constructor(private readonly repository: SearchRepository) {}

  async handle(event: SearchEvent) {
    return await this.repository.getSearchRequest(event.search);
  }
}