import { IFeed } from '../interfaces';

export class GetHomeFeedEvent {
  constructor(public readonly feed: IFeed) {}
}
