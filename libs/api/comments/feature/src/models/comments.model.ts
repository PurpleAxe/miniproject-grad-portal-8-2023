import { AggregateRoot } from '@nestjs/cqrs';
//import {Timestamp} from "firebase/firestore";
import {Timestamp} from "firebase-admin/firestore";
import { IComment, UpdateCommentsEvent } from "@mp/api/comments/util";

export class Comments extends AggregateRoot implements IComment {
  constructor(
    public userID: string,
    public text: string,
    public commentID: string,
    public postID :string,
    public timestamp?: Timestamp
  ) {
    super();
  }

  static fromData(comment: IComment): Comments {
    const instance = new Comments(
      comment.userID,
      comment.text,
      comment.commentID,
      comment.postID,
      comment.timestamp
    );
    return instance;
  }

  updateComment() {
    this.apply(new UpdateCommentsEvent(this.toJSON()))
  }

  toJSON(): IComment {
    return {
      userID: this.userID,
      text: this.text,
      commentID: this.commentID,
      postID: this.postID,
      timestamp: this.timestamp
    };
  }

}
