import {
  SearchPostsCommand,
  ISearchResponse,
  ISearch,
} from '@mp/api/search/util';
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
    const searchResult = await this.searchRepository.search_for(
      "message",
      request.keyword,
      'post'
    );
    let userObject = null;
    if (searchResult.length < 0) {
      const userQuery = await this.searchRepository.search_for(
        'message',
        searchResult[0].userId,
        'profiles'
      );
      userObject = userQuery[0];
    }
    console.log(searchResult);
    const response: ISearchResponse = {
      search: {
        keyword: request.keyword,
        field: request.field,
        searchResults: searchResult,
        user: userObject,
      },
    };
    return response;
  }
}
