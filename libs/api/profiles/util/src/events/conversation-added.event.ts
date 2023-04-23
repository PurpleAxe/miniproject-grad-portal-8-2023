import {IProfile} from "../interfaces";
export class ConversationAddedEvent {
  constructor(public readonly profile: IProfile) {}
}
