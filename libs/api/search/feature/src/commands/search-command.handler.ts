import { SearchCommand, ISearchResponse, ISearch } from '@mp/api/search/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Search } from '../models';

@CommandHandler(SearchCommand)
export class SearchCommandHandler
  implements ICommandHandler<SearchCommand, ISearchResponse>
{
  constructor(private publisher: EventPublisher) {}
  async execute(command: SearchCommand) {
    const request = command.request.search;

    console.log(command.request.search.keyword);

    const _search = this.publisher.mergeObjectContext(Search.fromData(request));
    _search.getSearchRequest();
    _search.commit();
    console.log('Hello there');
    console.log('_search', _search);
    const response: ISearchResponse = {
      search: {
        keyword: _search.keyword,
        field: _search.field,
        searchResults: _search.searchResults,
      },
    };
    console.log(response, '%%%%%%%%%%%%%%%%%%%');
    return response;
  }
}
