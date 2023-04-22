/*
*  @jest-environment node
*/
import {CreateConversationCommand, ICreateConversationRequest, ISendMessageResponse, SendMessageCommand} from "@mp/api/message/util";
import {ISendMessageRequest} from "@mp/api/message/util";
import { CreateConversationHandler, SendMessageHandler } from '../commands';
import { MessageModule } from "../message.module";
import {Test, TestingModule} from "@nestjs/testing";
import {CommandBus, CqrsModule, EventBus, EventPublisher} from '@nestjs/cqrs';
import * as firebase from "firebase-admin";
import { sendMessageFeature } from './api-message-feature';
import { Timestamp } from "firebase-admin/firestore";
import {UsersModule} from "@mp/api/users/data-access";
import {ConversationCreatedHandler, MessageSentHandler} from "../events";
import { Message } from "../models";
import {MessageRepository} from "@mp/api/message/data-access";

firebase.initializeApp({
  projectId: "timehive-29588",
})
const db = firebase.firestore()
db.settings({
  host: "localhost:5003",
  ssl: false
});
describe('Message Command Handlers', () => {
  let commandBus: CommandBus;

  beforeEach(async () => {
    const controler: TestingModule = await Test.createTestingModule({
      imports : [CqrsModule, MessageModule, UsersModule],
      providers : [SendMessageHandler, CreateConversationHandler]
    }).compile();
    await controler.init()
    commandBus = controler.select(CqrsModule).get<CommandBus>(CommandBus);
  });

  describe('sendMessageService', () => {
    it("should send a message and the message returned should have a id" , async () => {
      firebase.firestore().collection("conversations").doc("testing").set({
	conversationID : "testing"
      }).then((docRef) => {
	console.log(docRef.writeTime);
      }).catch((error) => {
	console.log(error);
      });

      const messageToSend:ISendMessageRequest =
	{
	conversation : {
	  conversationID : "testing",
	  messages : [
	    {
	      metaData : {
		sender : {
		  userId : "gustav testing",
		},
		timePosted : Timestamp.now(),
	      },
	      content : {
		textData : "testing testing 123",
	      },
	    },
	  ]
	}
      }
      const messageToSendCopy: ISendMessageRequest = JSON.parse(JSON.stringify(messageToSend));
      const result: ISendMessageResponse = { message: messageToSendCopy.conversation.messages![0] };
      const send = await commandBus.execute(new SendMessageCommand(messageToSend));
      console.log(send);
      expect({...send}).not.toStrictEqual({...result});
    });
  })
  describe('CreateConversation', () => {
    it("Create A new Conversation between two users" , async () => {
      // pre test set up.
      await firebase.firestore().collection("users").doc("1").set({
	id : "1"
      })
      await firebase.firestore().collection("users").doc("2").set({
	id : "2"
      })

      const newConversation:ICreateConversationRequest = { // testing conversation object.
	conversation : {
	  members : [
	    {id : "1"},
	    {id : "2"},
	  ],
	},
      };

      const compare:ICreateConversationRequest = JSON.parse(JSON.stringify(newConversation));
      const sent = await commandBus.execute(new CreateConversationCommand(newConversation));
      console.log(newConversation);
      console.log(sent);
    })
  });
});

describe('Message Event Handlers', () => {
  let eventBus: EventBus;
  let eventPublisher: EventPublisher;

  beforeEach(async () => {
    const controler: TestingModule = await Test.createTestingModule({
      imports : [CqrsModule, MessageModule, UsersModule],
      providers : [MessageSentHandler,MessageRepository, ConversationCreatedHandler]
    }).compile();
    await controler.init()
    eventBus = controler.select(CqrsModule).get<EventBus>(EventBus);
    eventPublisher = controler.select(CqrsModule).get<EventPublisher>(EventPublisher);
  });

  describe('messageToSendEventHandler', () => {
    it("should create a new message related to a conversaion in the database" , async () => {
      const messageToSend:ISendMessageRequest = // mock data
	{
	conversation : {
	  conversationID : "testing",
	  messages : [
	    {
	      metaData : {
		sender : {
		  userId : "gustav testing",
		},
		timePosted : Timestamp.now(),
	      },
	      content : {
		textData : "testing testing 123",
	      },
	    },
	  ]
	}
      }
      const message = eventPublisher.mergeObjectContext(
	Message.fromData(messageToSend.conversation)
      );
      message.sendMessage();
      message.commit();
    });
  });
  describe('CreateConversationEventHandler', () => {
    it("should create a new conversation in the database" , async () => {
      const newConversation:ICreateConversationRequest = { // testing conversation object.
	conversation : {
	  members : [
	    {id : "1"},
	    {id : "2"},
	  ],
	},
      };
      const message = eventPublisher.mergeObjectContext(
	Message.fromData(newConversation.conversation)
      );
      message.createConversation();
      message.commit();

    });
  });
});
