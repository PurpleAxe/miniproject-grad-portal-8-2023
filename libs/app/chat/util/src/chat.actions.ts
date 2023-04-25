import { IConversation, IMessage } from '@mp/api/message/util';

export class SendMessage {
  static readonly type = '[Chat] SendMessage';
  constructor(public readonly messageToAdd: IMessage) {}
}

export class SetChat {
  static readonly type = '[Chat] AddMessage';
  constructor(public readonly currentConversation: IConversation | null) {}
}

/*export class AddMessage {
  static readonly type = '[Chat] AddMessage';
  constructor(public readonly messageToAdd: IMessage | null) {}
}*/

export class DeleteMessage {
  static readonly type = '[Chat] DeleteMessage';
  constructor(public readonly messageToDelete: IMessage | null) {}
}
