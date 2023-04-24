import { Timestamp } from "firebase-admin/firestore";
import { IPost } from "@mp/api/post/util";
import { IProfile } from "@mp/api/profiles/util";

export interface IFeed {
  user: IProfile,
  posts: IPost[];
}

export interface IIFeed{ ///for front end don't mind it service engineer ;)
  Post:{
      UserId: string | null;
      Post : {
          postId: string | null;
          contents:{
              post: string | null;
              challenge: string | null;
              department: string | null;
          },
          likedProfileIds: [];
          dislikedProfileIds: [];
          timestamp?: Timestamp | null;
      }
  }
}