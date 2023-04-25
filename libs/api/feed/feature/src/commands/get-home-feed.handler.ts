import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  IGetHomeFeedResponse,
  IGetHomeFeedRequest,
  GetHomeFeedCommand,
} from '@mp/api/feed/util';
import { Feed } from '../models';
import { FeedRepository } from '@mp/api/feed/data-access';

@CommandHandler(GetHomeFeedCommand)
export class GetHomeFeedHandler 
  implements 
    ICommandHandler<
    GetHomeFeedCommand, 
    IGetHomeFeedRequest
    > 
{
  constructor(
    private publisher: EventPublisher,
    private feedRepository: FeedRepository
    ) {}

  async execute(command: GetHomeFeedCommand) {
    const request = command.request;
    // const postsArray = await this.feedRepository.getHomeFeed(request.feed);
    const postsArray = await this.feedRepository.getHomeFeed(request.feed);

    var response: IGetHomeFeedResponse = {feed: {user: request.feed.user, posts: postsArray}};
    // var response: IGetFeedResponse = {feed: request.feed};
    return response;
  }
}
