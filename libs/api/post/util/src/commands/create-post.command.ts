import {ICreatePostRequest} from "../requests"

export class CreatePostCommand {
    constructor(public readonly Onpost:ICreatePostRequest)
    {}
}
