import { Timestamp } from "firebase-admin/firestore";
import { IPost } from "@mp/api/post/util";
import { IProfile } from "@mp/api/profiles/util";

export interface IFeed {
  user: IProfile,
  posts: IPost[]
}

export interface IIFeed{ ///for front end don't mind it service engineer ;)
      UserId: string;
      Post : {
          postId: string;
          contents:{
              text: string;
              challenge: string;
              department: string;
          },
          likedProfileIds: string[];
          dislikedProfileIds: string[];
          timestamp?: Timestamp | string;
      }
}