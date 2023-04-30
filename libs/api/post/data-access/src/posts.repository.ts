import { IComment } from '@mp/api/comments/util';
import { IPost } from '@mp/api/post/util';
import { Injectable } from '@nestjs/common';
import {Timestamp} from "firebase-admin/firestore";
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import {log} from 'console';

@Injectable()
export class PostsRepository {
  async getPost(post: IPost) {
    return await admin
      .firestore()
      .collection('post')
      .withConverter<IPost>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IPost;
        },
        toFirestore: (it: IPost) => it,
      })
      .doc(post.postId!)
      .get();
  }

  async createPost(post: IPost) {
    return await admin
      .firestore()
      .collection('post')
      .doc(post.postId!)
      .create(post);
  }

  async postComment(comment : IComment):Promise<IComment>{
    console.log("comment.postID")
    console.log(comment.postID)
    const postRef = admin
      .firestore()
      .collection("post")
      .where("postId", "==", comment.postID).get();

    const docRef = admin
      .firestore()
      .collection("comments")
      .doc();
    const commentToInsert : IComment = {
      userID : comment.userID,
      text : comment.text,
      timestamp : comment.timestamp,
      commentID : docRef.id,
      postID : comment.postID
    }
    docRef.create(commentToInsert);

    (await postRef).docs
      .at(0)?.ref
      .update({
      comments : admin.firestore.FieldValue.arrayUnion(commentToInsert.commentID)
    })
    return (await docRef.get()).data() as IComment;
  }

  async likePost(post:IPost) {
    await admin
      .firestore()
      .collection("post")
      .doc(post.postId!)
      .update({
        likes : FieldValue.increment(1)
      })
  }

  async removeLike(post:IPost) {
    await admin
      .firestore()
      .collection("post")
      .doc(post.postId!)
      .update({
        likes : FieldValue.increment(-1)
      })
  }

  async dislikePost(post:IPost) {
    await admin
      .firestore()
      .collection("post")
      .doc(post.postId!)
      .update({
        dislikes : FieldValue.increment(1)
      })
  }

  async removeDislike(post:IPost) {
    await admin
      .firestore()
      .collection("post")
      .doc(post.postId!)
      .update({
        dislikes : FieldValue.increment(-1)
      })
  }
}
