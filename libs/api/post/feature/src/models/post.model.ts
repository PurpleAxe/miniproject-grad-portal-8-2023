import {IPost, PostCreatedEvent, PostDislikedEvent, PostDislikeRemovedEvent, PostLikedEvent, PostLikeRemovedEvent} from "@mp/api/post/util";
import { IComment } from "@mp/api/comments/util";
import {AggregateRoot} from "@nestjs/cqrs";
import {Timestamp} from "firebase-admin/firestore";
import {UsersRepository} from "@mp/api/users/data-access";
import {randomUUID} from "crypto";
import {log} from "console";
import {ProfilesRepository} from "@mp/api/profiles/data-access";

export class PostModel extends AggregateRoot implements IPost {
  private readonly repository : UsersRepository = new UsersRepository();
  private readonly profilesRepository : ProfilesRepository = new ProfilesRepository();
  constructor(
    public postId: string | null | undefined,
    public userId: string,
    public likes?: number | null | undefined,
    public dislikes?: number | null | undefined,
    public message?: string | null | undefined,
    public comments?: IComment[] | null | undefined,
    public created?: Timestamp | null | undefined,
    public challenge?: string,
    public department?: string,
    public userName?:string | null | undefined
    ) {
    super();
  }
  static fromData(post: IPost): PostModel {
    const instance = new PostModel(
      post.postId,
      post.userId,
      post.likes,
      post.dislikes,
      post.message,
      post.comments,
      post.created,
      post.challenge,
      post.department
    );

    return instance;
  }

  async createPost(){
    if (!(await this.repository.doesUserExist({"id" :this.userId}))) {
      throw Error("User attempting to make a post does not exist");
    }
    this.userName ? this.userName: this.userName = await this.profilesRepository.findOne({userId:this.userId}).then((profile)=>{return profile.data()?.accountDetails?.displayName})
    this.postId = Timestamp.now().nanoseconds + randomUUID();
    log(this.toJSON());
    return this.apply(new PostCreatedEvent(this.toJSON()));
  }

  async likePost(user:string) {
    this.likes = this.likes! + 1;
    return this.apply(new PostLikedEvent(this.toJSON(),user));
  }

  async likePostRemoved(user:string) {
    this.likes = this.likes! - 1;
    return this.apply(new PostLikeRemovedEvent(this.toJSON(),user));
  }

  async dislikePost(user:string) {
    this.likes = this.dislikes! + 1;
    return this.apply(new PostDislikedEvent(this.toJSON(),user));
  }

  async dislikePostRemoved(user:string) {
    this.likes = this.dislikes! - 1;
    return this.apply(new PostDislikeRemovedEvent(this.toJSON(),user));
  }

  toJSON(): IPost {
    return {
      postId: this.postId,
      userId: this.userId,
      likes: this.likes,
      dislikes: this.dislikes,
      message: this.message,
      comments: this.comments,
      created: this.created,
      challenge: this.challenge,
      department: this.department,
      userName: this.userName
    };
  }


}
