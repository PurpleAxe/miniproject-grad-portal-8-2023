import { IPost } from "../interfaces";

export class PostLikeRemovedEvent {
    constructor(
      public readonly Onpost: IPost,
      public readonly user: string
    ) {}
}
