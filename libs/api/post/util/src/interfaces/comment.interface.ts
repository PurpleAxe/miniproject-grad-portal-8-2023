import { Timestamp } from "firebase-admin/firestore";

export interface IComment{
    userID: string;
    test: string;
    timestamp: Timestamp;
    commentID: string;
    postID :string;
}