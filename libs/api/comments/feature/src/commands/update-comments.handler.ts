import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  IUpdateCommentsResponse,
  UpdateCommentsCommand,
} from '@mp/api/comments/util';
import { Comments } from '../models';
import { PostsRepository } from '@mp/api/post/data-access';
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
    const post = this.publisher.mergeObjectContext(Comments.fromData(request.comment));
    post.updateComment();
    post.commit();
    
    var commentsArray = await this.commentsRepository.search_for("userId", command.request.comment.userID , "comment");
    var response: IUpdateCommentsResponse = {comments: commentsArray};
    return response;
  }
}
