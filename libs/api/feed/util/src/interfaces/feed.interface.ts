import { Timestamp } from "firebase-admin/firestore";

export interface IFeed {
  id: string;
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