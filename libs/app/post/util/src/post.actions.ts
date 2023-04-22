import { Timestamp } from 'firebase-admin/firestore';

export class CreatePost{
    static readonly type = '[CreatePost] Create Post';
    constructor(public payload: { 
        body: string;
        department:string;
        challenge:string;
        timestamp:Timestamp;
    }) {}
} 