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
    constructor(public payload: { 
        postId: string; 
        userId: string;
    }) {
        console.log("post.actions Like postId:" + payload.postId);
    }
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
