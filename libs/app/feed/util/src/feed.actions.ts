// export class LoadFeed{
//     static readonly type = '[Feed] LoadFeed';
//     constructor(public payload: { uid: string }) {} /**********NOTE ADDED LOAD HOME FEED AND LOAD DISCOVERY FEED ACTIONS**********/
// }

import { Timestamp } from "@firebase/firestore";

export class LikePost{
    static readonly type = '[Feed] LikePost';
    constructor(public payload: { 
        postId: string; 
        userId: string;
    }) {
        console.log("post.actions: Like postId:s" + payload.postId);
    }
}

export class RemoveLike{
    static readonly type = '[Feed] RemoveLike';
    constructor(public payload: { uid: string }) {}
}

export class DislikePost{
    static readonly type = '[Feed] DislikePost';
    constructor(public payload: { 
        postId: string; 
        userId: string;
    }) {
        console.log("post.actions Dislike postId:" + payload.postId);
    }
}

export class RemoveDislike{
    static readonly type = '[Feed] RemoveDislike';
    constructor(public payload: { uid: string }) {}
}

export class PostComment{
    static readonly type = '[Feed] PostComment';
    constructor(public payload: { uid: string }) {}
}

export class FetchHomeFeed{
    static readonly type ="[Feed] fetch home feed";
}

export class FetchDiscoveryFeed{
    static readonly type ="[Feed] load discovery feed";
}

export class FetchOwnPosts{
    static readonly type ="[Profile] load own Posts";
}

export class fetchComments{
    static readonly type ='[Comments] fetch post comments';
    constructor(public payload:{postId:string, ownerId:string}) {}
}

export class sendComment{
    static readonly type='[Comments] send post comment';
    constructor(public payload:{
        postId:string,
        senderId:string,
        text:string,
        commentId:string,
        ownerId:string,
        timestamp:Timestamp
    }) {}
}