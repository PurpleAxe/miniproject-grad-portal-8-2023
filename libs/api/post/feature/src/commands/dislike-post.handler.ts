import {PostsRepository} from "@mp/api/post/data-access";
import { DislikePostCommand, IDislikePostResponse } from "@mp/api/post/util";
import { IPost } from '@mp/api/post/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PostModel } from "../models";
import {ProfilesRepository } from "@mp/api/profiles/data-access";
import {log} from "console";

@CommandHandler(DislikePostCommand)
export class DislikePostHandler
  implements ICommandHandler<DislikePostCommand,IDislikePostResponse>
{
    constructor(
      private publisher: EventPublisher,
      private repository: PostsRepository,
      private profileRepo: ProfilesRepository,
    ) {}

    async execute(command: DislikePostCommand) {
      const request = command.Onpost;
      const postID:string = request.post.postId!;
      const postUserId = request.post.userId;
      const likingUserID = request.userID;

      const posts = await this.profileRepo.getDisliked(request.userID!);

      const data: IPost = {
        postId:postID,
        userId: postUserId,
      };
      const post = this.publisher.mergeObjectContext(PostModel.fromData(data)); // bind data
      const findPost = (object: string):boolean => { // lambda for search
        if (object == postID) {
          return true;
        }
        return false;
      }
      if (posts.find(findPost)?.length! >= 1) {
      log("made it")
        await post.dislikePostRemoved(likingUserID!)
      } else {
        await post.dislikePost(likingUserID!);
      }
      post.commit();
      const response: IDislikePostResponse = {"post" : post.toJSON()};
      return response;
  }
}
