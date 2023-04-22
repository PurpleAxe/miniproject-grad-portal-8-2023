import {IDislikePostRequest} from "../requests";

export class LikePostCommand {
    constructor(public readonly Onpost:IDislikePostRequest)
    {}
}
