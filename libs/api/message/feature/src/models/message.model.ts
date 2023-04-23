import {
  MessageSentEvent,
  MessageDeletedEvent,
  IMessage,
  ConversationCreatedEvent,
} from '@mp/api/message/util';
import { IUser } from '@mp/api/users/util';
import { IConversation } from '@mp/api/message/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { randomInt } from 'crypto';
import { Inject } from '@nestjs/common';
import { MessageRepository } from '@mp/api/message/data-access';
import { randomUUID } from 'crypto';

export class Message extends AggregateRoot implements IConversation {
  @Inject(MessageRepository)
  private readonly repository: MessageRepository = new MessageRepository();
  constructor(
    public conversationID?: string | null | undefined,
    public messages?: IMessage[] | null | undefined, //just to avoid build errors
    public members?: IUser[] | null | undefined, // TODO remove undefined for authentication purpouses
    public membersID?: string[]
  ) {
    super();
  }

  static fromData(message: IConversation): Message {
    const instance = new Message(
      message.conversationID,
      message.messages,
      message.members,
      message.membersID
    );
    return instance;
  }

  sendMessage() {
    this.messages!.at(0)!.id = (
      this.messages!.at(0)!.metaData.timePosted.seconds + randomInt(10000)
    ).toString();
    this.apply(new MessageSentEvent(this.toJSON()));
  }

  deleteMessage() {
    this.apply(new MessageDeletedEvent(this.toJSON()));
  }

  async createConversation() {
    this.conversationID = randomUUID() + Date.now();
    this.apply(new ConversationCreatedEvent(this.toJSON()));
  }

  toJSON(): IConversation {
    const conversation: IConversation = {
      conversationID: this.conversationID,
    };
    this.messages ? (conversation.messages = this.messages) : undefined;
    this.members ? (conversation.members = this.members) : undefined;
    this.membersID ? (conversation.membersID = this.membersID) : undefined;
    return conversation;
  }
}
