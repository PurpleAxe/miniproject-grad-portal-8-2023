import { IFeed } from '../interfaces';

export class GetFeedEvent {
  constructor(public readonly feed: IFeed) {}
}
