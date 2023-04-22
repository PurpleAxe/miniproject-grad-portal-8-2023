export class PostLike{
    static readonly type = '[PostLike] Post Like';
    constructor(public payload: { uid: string }) {}
} 