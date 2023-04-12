import {
    SearchCommand
} from '@mp/api/search/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(SearchCommand)
export class CreateSearchHandler
implements ICommandHandler<SearchCommand>
{
  constructor(private publisher: EventPublisher) {}
  async execute(command: SearchCommand) {
    console.log("Hello there");
  }
}