import { Timestamp } from "firebase-admin/firestore";
import { IComment } from "./comment.interface"

export interface IPost{
    likes: number;
    dislikes: number;
    created: Timestamp;
    has_image: boolean;
    image?: string|null|undefined;
    postID: string;
    userID: string;
    comments: IComment[];
    message: string;
    
}