import { Timestamp } from "firebase-admin/firestore";
import { IComment } from "./comment.interface"

export interface IPost{
    postId: string;
    userId: string;
    likes?: number | null | undefined;
    dislikes?: number | null | undefined;
    message?: string | null | undefined;
    comments?: IComment[] | null | undefined;
    created?: Timestamp | null | undefined;
}
