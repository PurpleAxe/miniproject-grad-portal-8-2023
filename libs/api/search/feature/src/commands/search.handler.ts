import {
    SearchCommand,
    ISearchResponse
} from '@mp/api/search/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Search } from '../models';

@CommandHandler(SearchCommand)
export class CreateSearchHandler
implements ICommandHandler<SearchCommand, ISearchResponse>
{
  constructor(private publisher: EventPublisher) {}
  async execute(command: SearchCommand) {
    const request = command.request.search;
    console.log("Hello there");
    console.log(command.request.search.text);

    const search = this.publisher.mergeObjectContext(Search.fromData(request));
    const users = search.getSearchRequest();
    search.commit();

    const response: ISearchResponse = {results: []};
    return response;
  }

}