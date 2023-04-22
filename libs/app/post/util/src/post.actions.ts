import { Timestamp } from 'firebase-admin/firestore';

export interface MyPayload {
    body: string;
    department:string;
    challenge:string;
  }

export class CreatePost{
    static readonly type = '[CreatePost] Create Post';
    constructor(public payload: MyPayload) {
        console.log("post.actions:" + payload.body);
    }
} 