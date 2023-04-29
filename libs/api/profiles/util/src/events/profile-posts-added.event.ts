import {IPost} from "@mp/api/post/util";
export class ProfilePostAddedEvent {
  constructor(
    public readonly post: IPost,
    public readonly profile: string,
  ) {}
}
