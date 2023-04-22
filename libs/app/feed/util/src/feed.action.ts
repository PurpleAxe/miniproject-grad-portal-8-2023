import { Timestamp } from "firebase-admin/firestore";

export interface IFeed{
    Post:{
        UserId: string | null;
        Post : {
            postId: string | null;
            contents:{
                post: string | null;
                challenge: string | null;
                department: string | null;
            },
            likedProfileIds: [];
            dislikedProfileIds: [];
            timestamp: Timestamp | null;
        }
    }
}


export class FetchHomeFeedAction{
    static readonly type ="[Feed] fetch home feed";
}

export class LoadHomeFeedAction{
    static readonly type ="[Feed] load home feed";
    constructor(public payload: IFeed[]){}
}

export class FetchDiscoveryFeedAction{
    static readonly type ="[Feed] load discovery feed";
}

export class LoadDiscoveryFeedAction{
    static readonly type ="[Feed] load discovery feed";
    constructor(public payload: IFeed[]){}
}
