import { IComment } from '@mp/api/post/util';
import { IReactions } from '@mp/api/post/util';
import { IPost } from '@mp/api/post/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class PostsRepository {
  async Onpost(post: IPost) {
    return await admin
      .firestore()
      .collection('Post')
      .withConverter<IPost>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IPost;
        },
        toFirestore: (it: IPost) => it,
      })
      .doc(post.postId)
      .get();
  }

  async createPost(post: IPost) {
    return await admin
      .firestore()
      .collection('Post')
      .doc(post.postId)
      .create(post);
  }
}
