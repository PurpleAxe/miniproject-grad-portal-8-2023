import { CreatePostCommand } from "@mp/api/post/util";
import { IPost } from '@mp/api/post/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { PostModel } from "../models";

@CommandHandler(CreatePostCommand)
export class CreatePostHandler
  implements ICommandHandler<CreatePostCommand>
{
    constructor(private publisher: EventPublisher) {}

    async execute(command: CreatePostCommand) {
        const request = command.request;
        const userId = request.post.userId;
        const postId = request.post.postId;
        const likes = request.post.likes;
        const dislikes = request.post.dislikes;
        const comments = request.post.comments;
        const message = request.post.message;


      const data: IPost = {
        postId,
        userId,
        likes,
        dislikes,
        message,
        comments,
        created: Timestamp.fromDate(new Date()),
      };

      const post = this.publisher.mergeObjectContext(PostModel.fromData(data));

      post.create();
      post.commit();
  }

}
