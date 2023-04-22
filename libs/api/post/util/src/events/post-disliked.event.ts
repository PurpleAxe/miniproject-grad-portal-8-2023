import { IPost } from "../interfaces";

export class PostDislikedEvent {
    constructor(
      public readonly Onpost: IPost,
      public readonly user: string
    ) {}
}
