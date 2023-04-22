import { IConversation } from '@mp/api/message/util';

// export class SendMessage {
//   static readonly type = '[Inbox] SendMessage';
// }

export class CreateConversation { //item is a user to speak to 
  static readonly type = '[Inbox] CreateConversation';
}

/*export class SetInbox {
  static readonly type = '[Profile] SetInbox';
  constructor(public readonly conversation: IConversation | null) {}
}*/

// export class DeleteMessage {
//   static readonly type = '[Inbox] DeleteMessage';
//   constructor(public readonly messageToDelete: IMessage | null) {}
// }

/*export class SubscribeToInbox {
  static readonly type = '[Inbox] SubscribeToInbox';
}*/

export class GetUsers {
  static readonly type = '[Inbox] GetUsers';
}

export class GetConversation {
  static readonly type = '[Inbox] GetConversations';
}

export class GetUserId {
  static readonly type = '[Inbox] GetUserId';
}

export class Logout {
  static readonly type = '[Inbox] Logout';
}
