import {IComment, IPost, PostCreatedEvent, PostDislikedEvent, PostDislikeRemovedEvent, PostLikedEvent, PostLikeRemovedEvent} from "@mp/api/post/util";
import {AggregateRoot} from "@nestjs/cqrs";
import {Timestamp} from "firebase-admin/firestore";
import {UsersRepository} from "@mp/api/users/data-access";
import {randomUUID} from "crypto";

export class PostModel extends AggregateRoot implements IPost {
  private readonly repository : UsersRepository = new UsersRepository();
  constructor(
    public postId: string | null | undefined,
    public userId: string,
    public likes?: number | null | undefined,
    public dislikes?: number | null | undefined,
    public message?: string | null | undefined,
    public comments?: IComment[] | null | undefined,
    public created?: Timestamp | null | undefined
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
      post.created
    );

    return instance;
  }

  async createPost(){
    if (!(await this.repository.doesUserExist({"id" :this.userId}))) {
      throw Error("User attempting to make a post does not exist");
    }
    this.postId = Timestamp.now().nanoseconds + randomUUID();
    this.apply(new PostCreatedEvent(this.toJSON()));
  }

  async likePost(user:string) {
    this.likes = this.likes! + 1;
    this.apply(new PostLikedEvent(this.toJSON(),user));
  }

  async likePostRemoved(user:string) {
    this.likes = this.likes! - 1;
    this.apply(new PostLikeRemovedEvent(this.toJSON(),user));
  }

  async dislikePost(user:string) {
    this.likes = this.dislikes! + 1;
    this.apply(new PostDislikedEvent(this.toJSON(),user));
  }

  async dislikePostRemoved(user:string) {
    this.likes = this.dislikes! - 1;
    this.apply(new PostDislikeRemovedEvent(this.toJSON(),user));
  }

  toJSON(): IPost {
    return {
      postId: this.postId,
      userId: this.userId,
      likes: this.likes,
      dislikes: this.dislikes,
      message: this.message,
      comments: this.comments,
      created: this.created
    };
  }


}
