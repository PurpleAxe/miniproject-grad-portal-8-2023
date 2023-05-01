import { IConversation } from '@mp/api/message/util';
export class AddConversationToProfileCommand {
  constructor(public readonly request: IConversation) {}
}
