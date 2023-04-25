import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  IGetOwnFeedResponse,
  IGetOwnFeedRequest,
  GetOwnFeedCommand,
} from '@mp/api/feed/util';
import { Feed } from '../models';
import { FeedRepository } from '@mp/api/feed/data-access';

@CommandHandler(GetOwnFeedCommand)
export class GetOwnFeedHandler 
  implements 
    ICommandHandler<
    GetOwnFeedCommand, 
    IGetOwnFeedRequest
    > 
{
  constructor(
    private publisher: EventPublisher,
    private feedRepository: FeedRepository
    ) {}

  async execute(command: GetOwnFeedCommand) {
    const request = command.request;
    // const postsArray = await this.feedRepository.getHomeFeed(request.feed);
    const postsArray = await this.feedRepository.getOwnFeed(request.feed);

    var response: IGetOwnFeedResponse = {feed: {user: request.feed.user, posts: postsArray}};
    // var response: IGetFeedResponse = {feed: request.feed};
    return response;
  }
}
