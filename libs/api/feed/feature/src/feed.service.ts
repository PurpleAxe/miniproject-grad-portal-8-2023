import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  IGetOwnFeedRequest,
  IGetOwnFeedResponse,
  IGetDiscoveryFeedRequest,
  IGetDiscoveryFeedResponse,
  IGetHomeFeedRequest,
  IGetHomeFeedResponse
} from '@mp/api/feed/util';
import {
  GetOwnFeedCommand,
  GetHomeFeedCommand,
  GetDiscoveryFeedCommand
} from '@mp/api/feed/util';

@Injectable()
export class FeedService {
  constructor(private commandBus: CommandBus) {}
  async getHomeFeed(
    request: IGetHomeFeedRequest
  ): Promise<IGetHomeFeedResponse> {
    return await this.commandBus.execute<
    GetHomeFeedCommand,
    IGetHomeFeedResponse
    >(new GetHomeFeedCommand(request));
  }

  async getDiscoveryFeed(
    request: IGetDiscoveryFeedRequest
  ): Promise<IGetDiscoveryFeedResponse> {
    return await this.commandBus.execute<
    GetDiscoveryFeedCommand,
    IGetDiscoveryFeedResponse
    >(new GetDiscoveryFeedCommand(request));
  }

  async getOwnFeed(
    request: IGetOwnFeedRequest
  ): Promise<IGetOwnFeedResponse> {
    return await this.commandBus.execute<
    GetOwnFeedCommand,
    IGetOwnFeedResponse
    >(new GetOwnFeedCommand(request));
  }
}
