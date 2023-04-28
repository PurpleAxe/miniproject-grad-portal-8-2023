import { IPost } from "../interfaces";

export class PostLikedEvent {
    constructor(
      public readonly Onpost: IPost,
      public readonly user: string
    ) {}
}
