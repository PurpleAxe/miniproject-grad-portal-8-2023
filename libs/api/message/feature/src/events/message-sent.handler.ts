import {MessageRepository} from "@mp/api/message/data-access";
import {MessageSentEvent} from "@mp/api/message/util";
import {EventsHandler, IEventHandler} from "@nestjs/cqrs";

@EventsHandler(MessageSentEvent)
export class MessageSentHandler
  implements IEventHandler<MessageSentEvent>
  {
    constructor(private readonly repository : MessageRepository) {}

    async handle(event: MessageSentEvent) {
      console.log(event.conversation);
      event.ref.set(event.conversation);
    }
  }