import { SearchPostsCommand, ISearchResponse, ISearch } from '@mp/api/search/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Search } from '../models';
import { SearchRepository } from '@mp/api/search/data-access';

@CommandHandler(SearchPostsCommand)
export class SearchPostsCommandHandler
  implements ICommandHandler<SearchPostsCommand, ISearchResponse>
{
  constructor(
    private publisher: EventPublisher,
    private searchRepository: SearchRepository
    ) {}
  async execute(command: SearchPostsCommand) {
    const request = command.request.search;
    var searchResult = await this.searchRepository.search_for(request.field, request.field, "post");
    console.log(searchResult)
    var response: ISearchResponse = {search: {keyword: request.keyword, field: request.field, searchResults: searchResult}}
    return response;
  }
}
