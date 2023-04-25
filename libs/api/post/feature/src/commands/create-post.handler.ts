import { CreatePostCommand, ICreatePostResponse } from "@mp/api/post/util";
import { IPost } from '@mp/api/post/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { PostModel } from "../models";

@CommandHandler(CreatePostCommand)
export class CreatePostHandler
  implements ICommandHandler<CreatePostCommand,ICreatePostResponse>
{
    constructor(private publisher: EventPublisher) {}

    async execute(command: CreatePostCommand) {
      const request = command.request;
      const userId = request.post.userId;
      const likes = 1;
      const dislikes = 0;
      const comments = request.post.comments;
      const message = request.post.message;


      const data: IPost = {
          postId:null,
          userId,
          likes,
          dislikes,
          message,
          comments,
        created: Timestamp.fromDate(new Date()),
      };

      const post = this.publisher.mergeObjectContext(PostModel.fromData(data));

      post.createPost();
      post.commit();
      const response: ICreatePostResponse = {"post" : post.toJSON()};
      return response;
  }

}
