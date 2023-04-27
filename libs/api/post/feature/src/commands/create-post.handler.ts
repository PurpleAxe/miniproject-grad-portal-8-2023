import { CreatePostCommand, ICreatePostResponse } from "@mp/api/post/util";
import { IPost } from '@mp/api/post/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {log} from "console";
import { Timestamp } from 'firebase-admin/firestore';
import { PostModel } from "../models";

@CommandHandler(CreatePostCommand)
export class CreatePostHandler
  implements ICommandHandler<CreatePostCommand,ICreatePostResponse>
{
    constructor(private publisher: EventPublisher) {}

    async execute(command: CreatePostCommand) {
      console.log(`${CreatePostHandler.name} - ${command.request}`);
      const request = command.request;
      log(request);
      const userId = request.post.userId;
      const likes = 0;
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

      await post.createPost();
      post.commit();
      const response: ICreatePostResponse = {"post" : post.toJSON()};
      return response;
  }

}
