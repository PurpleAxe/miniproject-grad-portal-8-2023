import { IDislikePostRequest } from "../requests"

export class DislikePostCommand {
    constructor(public readonly Onpost:IDislikePostRequest)
    {}
}
