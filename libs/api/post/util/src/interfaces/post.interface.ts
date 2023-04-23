import { Timestamp } from "firebase-admin/firestore";
<<<<<<< Updated upstream
=======
import { IComment } from "./comment.interface"
>>>>>>> Stashed changes

export interface IPost{
    postId: string;
    userId: string;
    likes?: number | null | undefined;
    dislikes?: number | null | undefined;
    message?: string | null | undefined;
    comments?: IComment[] | null | undefined;
    created?: Timestamp | null | undefined;
}


export interface IIPost{
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
          timestamp?: Timestamp | null;
      }]
  }
}