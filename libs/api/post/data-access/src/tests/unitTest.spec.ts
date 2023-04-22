/*
*  @jest-environment node
*/
import {Test, TestingModule} from "@nestjs/testing";
import { PostModule } from "../post.module";
import * as firebase from "firebase-admin";
import {PostsRepository} from "../posts.repository";
import {IComment, IPost} from "@mp/api/post/util";


describe('apiMessageFeature', () => {
  firebase.initializeApp({
    projectId: "timehive-29588",
  })
  const db = firebase.firestore()
  db.settings({
    host: "localhost:5003",
    ssl: false
  });

  beforeEach(async () => {
    const controler: TestingModule = await Test.createTestingModule({
      imports : [PostModule],
      providers : [PostsRepository]
    }).compile();
    await controler.init()
  });

  afterAll(async () => {
    // Stop the Firestore emulator
    await firebase.app().delete();
  });

  describe('Test Repository Module', () => {
    it("The create comment function must create a comment in the database." , async () => {
      const docRef = firebase.firestore().collection("post").doc("test")
      await docRef.set({
        postId : "test",
        userId : "test user",
        likes : 0,
        dislikes : 0,
        message : "hello",
        comments : [],
        created : firebase.firestore.Timestamp.now()
      });

      const repo = new PostsRepository;
      const comment:IComment = {
        "userID" : "Other user",
        "commentID" : "test",
        "postID" : "test",
        "timestamp" : firebase.firestore.Timestamp.now(),
        "text" : "this is a new comment"
      }

      const commentRef = await repo.postComment(comment);
      const post:IPost =(await docRef.get()).data() as IPost;
      expect(post.comments?.at(0)).toEqual(commentRef.commentID);
    })
  })
});
