import { IPost } from "../interfaces";

export class PostDislikeRemovedEvent {
    constructor(
      public readonly Onpost: IPost,
      public readonly user: string
    ) {}
}
