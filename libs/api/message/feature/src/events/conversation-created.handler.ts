import {MessageRepository} from "@mp/api/message/data-access";
import {ConversationCreatedEvent} from "@mp/api/message/util";
import {EventsHandler, IEventHandler} from "@nestjs/cqrs";

@EventsHandler(ConversationCreatedEvent)
export class ConversationCreatedHandler
  implements IEventHandler<ConversationCreatedEvent>
  {
    constructor(private readonly repository : MessageRepository) {}
    async handle(event: ConversationCreatedEvent) {
      this.repository.createConversation(event.conversation);
    }
  }
