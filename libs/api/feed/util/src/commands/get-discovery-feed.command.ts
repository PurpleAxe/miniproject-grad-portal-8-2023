import { IGetDiscoveryFeedRequest } from '../requests';

export class GetDiscoveryFeedCommand {
  constructor(public readonly request: IGetDiscoveryFeedRequest) {}
}
