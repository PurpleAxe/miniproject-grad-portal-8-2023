import { Timestamp } from "firebase-admin/firestore";
import { IPost } from "@mp/api/post/util";
import { IProfile } from "@mp/api/profiles/util";

export interface IFeed {
  user: IProfile,
  posts: IPost[]
}