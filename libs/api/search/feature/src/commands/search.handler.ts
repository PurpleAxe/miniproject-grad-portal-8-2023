import {
    SearchCommand
} from '@mp/api/search/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Search } from '../models';

@CommandHandler(SearchCommand)
export class CreateSearchHandler
implements ICommandHandler<SearchCommand>
{
  constructor(private publisher: EventPublisher) {}
  async execute(command: SearchCommand) {
    console.log("Hello there");
    console.log(command.request.search.text);
    const search = this.publisher.mergeObjectContext(new Search(command.request.search.text));
    search.commit();
  }
}