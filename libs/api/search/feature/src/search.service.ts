import {
  ISearchRequest,
  ISearchResponse,
  SearchUsersCommand,
  SearchPostsCommand,
  SearchEventsCommand
} from '@mp/api/search/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class SearchService {
  constructor(private commandBus: CommandBus) {}
  //TODO your function here
  async searchUsers(
    request: ISearchRequest
  ): Promise<ISearchResponse> {
    return await this.commandBus.execute<
    SearchUsersCommand,
      ISearchResponse
    >(new SearchUsersCommand(request));
  }

  async searchPosts(
    request: ISearchRequest
  ): Promise<ISearchResponse> {
    return await this.commandBus.execute<
    SearchPostsCommand,
      ISearchResponse
    >(new SearchPostsCommand(request));
  }

  async searchEvents(
    request: ISearchRequest
  ): Promise<ISearchResponse> {
    return await this.commandBus.execute<
    SearchEventsCommand,
      ISearchResponse
    >(new SearchEventsCommand(request));
  }
}
