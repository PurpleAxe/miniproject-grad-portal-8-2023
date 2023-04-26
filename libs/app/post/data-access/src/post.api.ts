import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Timestamp } from '@angular/fire/firestore';
import {
    IPost,
    ICreatePostRequest,
    ICreatePostResponse,

} from '@mp/api/post/util';

@Injectable()
export class PostApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions
  ) {}

  post$(id: string) {
    const docRef = doc(
      this.firestore,
      `post/${id}`
    ).withConverter<IPost>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IPost;
      },
      toFirestore: (it: IPost) => it,
    });
    return docData(docRef, { idField: 'id' });
  }

  async CreatePost(request: ICreatePostRequest){
    console.log("post.api CreatePost working" + request.post.message);
    return await httpsCallable<
    ICreatePostResponse,
    ICreatePostRequest
  >(
    this.functions,
    'createPost'
  )(request);
  }
}
