// import { Injectable } from '@angular/core';
// import { doc, docData, Firestore } from '@angular/fire/firestore';
// import { Functions, httpsCallable } from '@angular/fire/functions';
// import {
//     IPost,
//     ICreatePostRequest,
//     ICreatePostResponse,
//     IFetchPostRequest,
//     IFetchPostResponse,
//     ISharePostRequest,
//     ISharePostResponse,
//     ISharePostRequest,
// } from '@mp/api/post/util';

// @Injectable()
// export class ProfilesApi {
//   constructor(
//     private readonly firestore: Firestore,
//     private readonly functions: Functions
//   ) {}

//   post$(id: string) {
//     const docRef = doc(
//       this.firestore,
//       `profiles/${id}`
//     ).withConverter<IPost>({
//       fromFirestore: (snapshot) => {
//         return snapshot.data() as IPost;
//       },
//       toFirestore: (it: IPost) => it,
//     });
//     return docData(docRef, { idField: 'id' });
//   }

//   async createPost(request: ICreatePostRequest) {
//     return await httpsCallable<
//       ICreatePostRequest,
//       ICreatePostResponse
//     >(
//       this.functions,
//       'createPost'
//     )(request);
//   }

//   async fetchPost(request: IFetchPostRequest) {
//     return await httpsCallable<
//       IFetchPostRequest,
//       IFetchPostResponse
//     >(
//       this.functions,
//       'fetchPost'
//     )(request);
//   }

//   async sharePost(request: ISharePostRequest) {
//     return await httpsCallable<
//       ISharePostRequest,
//       ISharePostResponse
//     >(
//       this.functions,
//       'sharePost'
//     )(request);
//   }
// }