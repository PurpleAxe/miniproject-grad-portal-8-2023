import { IPost } from "../interfaces";

export class PostUpdatedEvent {
    constructor(public readonly Onpost: IPost) {}
}
