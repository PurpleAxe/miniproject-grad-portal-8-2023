import { Timestamp } from "firebase-admin/firestore";

export interface IFeed {
  id: string;
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