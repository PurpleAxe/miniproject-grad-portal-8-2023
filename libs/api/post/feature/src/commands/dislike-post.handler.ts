import {PostsRepository} from "@mp/api/post/data-access";
import { DislikePostCommand } from "@mp/api/post/util";
import { IPost } from '@mp/api/post/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PostModel } from "../models";
import {ProfilesRepository } from "@mp/api/profiles/data-access";

@CommandHandler(DislikePostCommand)
export class DislikePostHandler
  implements ICommandHandler<DislikePostCommand>
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

      if ((await this.repository.getPost(request.post)).data.length == 0) { // check post exists
        throw Error("Requested Post ID does not exist");
      }
      const userRef = (await this.profileRepo.findOne({"userId" : postUserId})); // find user profile

      if (userRef.data.length == 0) { // check user exists
        throw Error("User attempting to dislike does not exist.");
      }

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
      if (userRef.data()?.likedPosts?.find(findPost)?.length! >= 1) {
        post.dislikePostRemoved(likingUserID!)
      } else {
        post.dislikePost(likingUserID!);
      }
      post.commit();
  }

}
