import {IConversation } from "@mp/api/message/util";
export class createMessageNotificationCommand {
    constructor(public readonly request: IConversation) {}
}
