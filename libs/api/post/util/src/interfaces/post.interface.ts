import { Timestamp } from "firebase-admin/firestore";

export interface IPost{
  Document:{
      UserId: string | null;
      Post : [{
          postId: string | null;
          contents:{
              post: string | null;
              challenge: string | null;
              department: string | null;
          };
          likedProfileIds: string[];
          dislikedProfileIds: string[];
          timestamp: Timestamp | null;
      }]
  }
}