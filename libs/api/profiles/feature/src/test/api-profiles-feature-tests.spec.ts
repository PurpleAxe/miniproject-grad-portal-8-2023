/*
*  @jest-environment node
*/
import {Test, TestingModule} from "@nestjs/testing";
import * as firebase from "firebase-admin";
import {IComment, IPost, PostDislikedEvent} from "@mp/api/post/util";
import {ProfilesModule} from '../profiles.module';
import {ProfilesSagas} from "../profiles.sagas";
import {ProfileDislikedPostHandler} from "../events";
import {CqrsModule, EventBus} from "@nestjs/cqrs";
import {ProfileDislikedPostsUpdatedEvent} from "@mp/api/profiles/util";
import {ProfilesRepository} from "@mp/api/profiles/data-access";


describe('apiMessageFeature', () => {
  let event:EventBus;
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
      imports : [ProfilesModule, CqrsModule],
      providers : [ProfilesSagas,ProfileDislikedPostHandler, ProfilesRepository]
    }).compile();
    await controler.init()
    event = controler.select(CqrsModule).get<EventBus>(EventBus);
  });

  afterAll(async () => {
    // Stop the Firestore emulator
    await firebase.app().delete();
  });

  describe('Test Repository Module', () => {
    it("The create comment function must create a comment in the database." , async () => {
      event.publish(new ProfileDislikedPostsUpdatedEvent("1","1"));
    })
  })
});
