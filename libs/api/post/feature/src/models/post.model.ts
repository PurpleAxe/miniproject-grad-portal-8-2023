import {IComment, IPost, PostCreatedEvent} from "@mp/api/post/util";
import {AggregateRoot} from "@nestjs/cqrs";
import {Timestamp} from "firebase-admin/lib/firestore";
import {UsersRepository} from "@mp/api/users/data-access";

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
    if ((await this.repository.doesUserExist({"id" :this.userId}))) {
      throw Error("User attempting to make a post does not exist");
    }
    this.apply(new PostCreatedEvent(this.toJSON()));
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
