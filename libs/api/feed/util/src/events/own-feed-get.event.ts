import { IFeed } from '../interfaces';

export class GetOwnFeedEvent {
  constructor(public readonly feed: IFeed) {}
}
