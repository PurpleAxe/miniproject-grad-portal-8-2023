import { IConversation, IMessage } from '@mp/api/message/util';

export class SendMessage {
  static readonly type = '[Inbox] SendMessage';
}

export class CreateConversation {
  static readonly type = '[Inbox] CreateConversation';
  constructor(public readonly conversation: IConversation | null) {}
}

export class DeleteMessage {
  static readonly type = '[Inbox] DeleteMessage';
}

export class SetConversation {
  static readonly type = '[Inbox] SetConversation';
  constructor(public readonly conversation: IConversation | null,public readonly message: IMessage | null) {};
}