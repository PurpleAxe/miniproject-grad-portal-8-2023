import {Timestamp} from "firebase-admin/firestore";
import { IComment } from "@mp/api/comments/util"

export interface IPost{
    postId: string |null | undefined;
    userId: string;
    likes?: number | null | undefined;
    dislikes?: number | null | undefined;
    message?: string | null | undefined;
    comments?: IComment[] | null | undefined;
    created?: Timestamp | null | undefined;
    challenge?: string;
    department?: string;
}