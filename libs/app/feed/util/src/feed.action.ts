import { IFeed } from '@mp/app/feed/data-access';

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