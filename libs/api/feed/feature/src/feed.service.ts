import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IGetFeedResponse, IGetFeedRequest } from '@mp/api/feed/util';
import { GetFeedCommand } from '@mp/api/feed/util';

@Injectable()
export class FeedService {
  constructor(private commandBus: CommandBus) {}

  async fetchHomeFeed(
    request: IGetFeedRequest
  ): Promise<IGetFeedResponse> {
    return await this.commandBus.execute<
      GetFeedCommand,
      IGetFeedResponse
    >(new GetFeedCommand(request));
  }
}
