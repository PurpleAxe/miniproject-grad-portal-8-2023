import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  IUpdateCommentsResponse,
  UpdateCommentsCommand,
} from '@mp/api/comments/util';
import { Comments } from '../models';
import { CommentsRepository } from '@mp/api/comments/data-access';

@CommandHandler(UpdateCommentsCommand)
export class UpdateCommentsHandler 
  implements 
    ICommandHandler<
    UpdateCommentsCommand, 
    IUpdateCommentsResponse
    > 
{
  constructor(
    private publisher: EventPublisher,
    private commentsRepository: CommentsRepository
    ) {}

  async execute(command: UpdateCommentsCommand) {
    const request = command.request;
    const postsArray = await this.commentsRepository;

    // const post = this.publisher.mergeObjectContext(Comments.fromData(data));
    // var response: IUpdateCommentsResponse = {feed: {user: request.feed.user, posts: postsArray}};
    var response: IUpdateCommentsResponse = {comments: []};
    return response;
  }
}
