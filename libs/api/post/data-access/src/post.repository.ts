import { IComment } from '@mp/api/post/util';
import { IReactions } from '@mp/api/post/util';
import { IPost } from '@mp/api/post/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class PostRepository {
  async Onpost(OnPost: IPost) {
    return await admin
      .firestore()
      .collection('Post')
      .withConverter<IPost>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IPost;
        },
        toFirestore: (it: IPost) => it,
      })
      .doc(OnPost.postID)
      .get();
  }

  async Postfunction(Onpost: IPost) {
    return await admin
      .firestore()
      .collection('Post')
      .doc(Onpost.postID)
      .create(Onpost);
  }
}
