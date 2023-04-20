import { IPost } from "../interfaces";

export class ReactionUpdatedEvent {
    constructor(public readonly Onpost: IPost) {}
}
