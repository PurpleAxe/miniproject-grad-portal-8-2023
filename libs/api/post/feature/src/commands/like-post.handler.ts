import {PostsRepository} from "@mp/api/post/data-access";
import { ILikePostResponse, LikePostCommand } from "@mp/api/post/util";
import { IPost } from '@mp/api/post/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PostModel } from "../models";
import {ProfilesRepository } from "@mp/api/profiles/data-access";
import {log} from "console";

@CommandHandler(LikePostCommand)
export class LikePostHandler
  implements ICommandHandler<LikePostCommand,ILikePostResponse>
{
    constructor(
      private publisher: EventPublisher,
      private repository: PostsRepository,
      private profileRepo: ProfilesRepository,
    ) {}

    async execute(command: LikePostCommand) {
      const request = command.Onpost;
      const postID:string = request.post.postId!;
      const postUserId = request.post.userId;
      const likingUserID = request.userID;

      log(command)
      const userRef = (await this.profileRepo.findOne({"userId" : likingUserID!})); // find user profile
      const posts = await this.profileRepo.getLiked(request.userID!);

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
        await post.likePostRemoved(likingUserID!)
      } else {
        await post.likePost(likingUserID!);
      }
      post.commit();
      const response: ILikePostResponse = {"post" : post.toJSON()};
      return response;
  }

}
