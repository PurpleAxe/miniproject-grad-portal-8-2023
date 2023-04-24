import { IGetFeedRequest } from '../requests';

export class GetFeedCommand {
  constructor(public readonly request: IGetFeedRequest) {}
}
