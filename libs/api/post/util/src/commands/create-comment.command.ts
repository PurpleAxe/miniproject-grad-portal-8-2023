import { ICreateCommentRequest } from "../requests"

export class CreateCommentCommand {
    constructor(public readonly Onpost:ICreateCommentRequest)
    {}
}
