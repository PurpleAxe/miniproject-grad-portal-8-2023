import { IGetOwnFeedRequest } from '../requests';

export class GetOwnFeedCommand {
  constructor(public readonly request: IGetOwnFeedRequest) {}
}
