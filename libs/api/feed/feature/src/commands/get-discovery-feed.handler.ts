import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  IGetDiscoveryFeedResponse,
  IGetDiscoveryFeedRequest,
  GetDiscoveryFeedCommand,
} from '@mp/api/feed/util';
import { Feed } from '../models';
import { FeedRepository } from '@mp/api/feed/data-access';

@CommandHandler(GetDiscoveryFeedCommand)
export class GetDiscoveryFeedHandler 
  implements 
    ICommandHandler<
    GetDiscoveryFeedCommand, 
    IGetDiscoveryFeedRequest
    > 
{
  constructor(
    private publisher: EventPublisher,
    private feedRepository: FeedRepository
    ) {}

  async execute(command: GetDiscoveryFeedCommand) {
    const request = command.request;
    // const postsArray = await this.feedRepository.getDiscoveryFeed(request.feed);
    const postsArray = await this.feedRepository.getDiscoveryFeed(request.feed);

    var response: IGetDiscoveryFeedResponse = {feed: {user: request.feed.user, posts: postsArray}};
    // var response: IGetFeedResponse = {feed: request.feed};
    return response;
  }
}
