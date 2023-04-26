import { Timestamp } from '@angular/fire/firestore';

export interface MyPayload {
    body: string;
    department:string;
    challenge:string;
    timestamp?:Timestamp;
    userId:string;
  }

export class CreatePost{
    static readonly type = '[CreatePost] Create Post';
    constructor(public payload: MyPayload) {
        console.log("post.actions:" + payload.body);
    }
} 