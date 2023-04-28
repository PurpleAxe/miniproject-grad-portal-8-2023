import { Timestamp } from "firebase-admin/firestore";

export interface IComment{
    userID: string;
    text: string;
    timestamp?: Timestamp;
    commentID: string;
    postID :string;
}
