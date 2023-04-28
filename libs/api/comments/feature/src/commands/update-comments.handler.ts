import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  IUpdateCommentsResponse,
  UpdateCommentsCommand,
} from '@mp/api/comments/util';
import { Comments } from '../models';
import { PostsRepository } from '@mp/api/post/data-access';
//import { postRepository } from '@mp/api/postRepository/data-access';

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
    private commentsRepository: PostsRepository
    ) {}

  async execute(command: UpdateCommentsCommand) {
    const request = command.request;
    const post = this.publisher.mergeObjectContext(Comments.fromData(request.comment));
    post.updateComment();
    post.commit();
    
    const comment = await this.commentsRepository.postComment(request.comment);
    // const commentsArray = await this.commentsRepository.search_for("postId", command.request.comment.userID , "Post");
    const response: IUpdateCommentsResponse = {comments: [comment]};
    return response;
  }
}
