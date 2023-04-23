import { IComment } from '@mp/api/post/util';
import { IPost } from '@mp/api/post/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

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
      timestamp : admin.firestore.Timestamp.now(),
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
    const postRef = admin
      .firestore()
      .collection("post")
      .doc(post.postId!)
      .update({
        likes : admin.firestore.FieldValue.increment(1)
      })
  }

  async removeLike(post:IPost) {
    const postRef = admin
      .firestore()
      .collection("post")
      .doc(post.postId!)
      .update({
        likes : admin.firestore.FieldValue.increment(-1)
      })
  }

  async dislikePost(post:IPost) {
    const postRef = admin
      .firestore()
      .collection("post")
      .doc(post.postId!)
      .update({
        dislikes : admin.firestore.FieldValue.increment(1)
      })
  }

  async removeDislike(post:IPost) {
    const postRef = admin
      .firestore()
      .collection("post")
      .doc(post.postId!)
      .update({
        dislikes : admin.firestore.FieldValue.increment(-1)
      })
  }
}
