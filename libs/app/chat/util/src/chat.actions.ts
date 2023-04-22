import { IMessage } from '@mp/api/message/util';

export class SendMessage {
  static readonly type = '[Chat] SendMessage';
}
export class DeleteMessage {
  static readonly type = '[Chat] DeleteMessage';
  constructor(public readonly messageToDelete: IMessage | null) {}
}
