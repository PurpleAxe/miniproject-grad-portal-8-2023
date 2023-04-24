import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  IGetFeedResponse,
  GetFeedCommand,
} from '@mp/api/feed/util';
import { Feed } from '../models';

@CommandHandler(GetFeedCommand)
export class GetFeedHandler 
  implements 
    ICommandHandler<
    GetFeedCommand, 
    IGetFeedResponse
    > 
{
  constructor(
    private publisher: EventPublisher) {}

  async execute(command: GetFeedCommand) {
    const request = command.request;
    // merge context.
    
    const feedPublisher = this.publisher.mergeObjectContext(
      Feed.fromData({
        user: request.feed.user,
        posts: request.feed.posts
      })
    );

    feedPublisher.fetchHomeFeed();
    feedPublisher.commit();
    var response: IGetFeedResponse = {feed: feedPublisher};
    return response;
  }
}
