import { IFeed } from '../interfaces';

export class GetDiscoveryFeedEvent {
  constructor(public readonly feed: IFeed) {}
}
