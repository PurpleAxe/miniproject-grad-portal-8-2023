import {IComment, IPost, PostCreatedEvent} from "@mp/api/post/util";
import {AggregateRoot} from "@nestjs/cqrs";
import {Timestamp} from "firebase-admin/lib/firestore";
import {IProfile} from "@mp/api/profiles/util";

export class PostModel extends AggregateRoot implements IPost {
  constructor(
    public postId: string,
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

  create(){
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
