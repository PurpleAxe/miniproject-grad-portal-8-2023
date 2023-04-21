import { IMessage } from '@mp/api/message/util';

export class SendMessage {
  static readonly type = '[Inbox] SendMessage';
}
export class DeleteMessage {
  static readonly type = '[Inbox] DeleteMessage';
  constructor(public readonly messageToDelete: IMessage | null) {}
}
