import { IConversation } from '@mp/api/message/util';
import { IUser } from '@mp/api/users/util';

// export class SendMessage {
//   static readonly type = '[Inbox] SendMessage';
// }

export class CreateConversation {
  //item is a user to speak to
  static readonly type = '[Inbox] CreateConversation';
  constructor(public readonly member: IUser [] | null) {}
}

export class SetInbox {
  static readonly type = '[Profile] SetInbox';
  constructor(public readonly conversations: IConversation[] | null) {}
}

// export class DeleteMessage {
//   static readonly type = '[Inbox] DeleteMessage';
//   constructor(public readonly messageToDelete: IMessage | null) {}
// }

export class SubscribeToInbox {
  static readonly type = '[Inbox] SubscribeToInbox';
}

export class GetMembers {
  static readonly type = '[Inbox] GetMembers';
  constructor(public readonly clickedUser:  | null) {}
}

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
// export class setConvoMem {
//   static readonly type = '[Inbox] setConvoMem';
// }
