import { MessageModule as MessageDataAccessModule } from '@mp/api/message/data-access';
import {UsersModule, UsersRepository} from '@mp/api/users/data-access';
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import {
  SendMessageHandler,
  DeleteMessageHandler,
  CreateConversationHandler,
} from './commands';

import {
  ConversationCreatedHandler,
  MessageDeletedHandler,
  MessageSentHandler
} from './events';

import {MessageSagas} from './message.sagas';
import {MessageService} from './message.service';

export const CommandHandlers = [
  SendMessageHandler,
  DeleteMessageHandler,
  CreateConversationHandler,
]

export const EventHandlers = [
  MessageSentHandler,
  MessageDeletedHandler,
  ConversationCreatedHandler,
]

@Module({
  imports: [CqrsModule, MessageDataAccessModule, UsersModule],
  providers : [
    MessageService,
    ...CommandHandlers,
    ...EventHandlers,
    MessageSagas
  ],
  exports: [MessageService],
})
export class MessageModule {}
