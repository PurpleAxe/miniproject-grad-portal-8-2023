import { IGetHomeFeedRequest } from '../requests';

export class GetHomeFeedCommand {
  constructor(public readonly request: IGetHomeFeedRequest) {}
}
