import { IPost } from "../interfaces";

export class CommentUpdatedEvent {
    constructor(public readonly Onpost: IPost) {}
}
