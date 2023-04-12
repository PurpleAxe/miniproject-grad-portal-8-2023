import {
  ISearchRequest,
  ISearchResponse,
  SearchCommand
} from '@mp/api/search/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class SearchService {
  constructor(private commandBus: CommandBus) {}
  //TODO your function here
  async getSearchRequest(
    request: ISearchRequest
  ): Promise<ISearchResponse> {
    return await this.commandBus.execute<
      SearchCommand,
      ISearchResponse
    >(new SearchCommand(request));
  }
}
