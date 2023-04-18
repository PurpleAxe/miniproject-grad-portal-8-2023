import { Injectable } from '@angular/core';
import {
    IConversation,
    IMessage,
    ICreateConversationRequest,
    IDeleteMessageRequest,
    ISendMessageRequest,
    IMessageContent,
    IMessageMetaData
} from '@mp/api/message/util';
import { AuthState } from '@mp/app/auth/data-access';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {
    SendMessage,
    CreateConversation,
    DeleteMessage,
    SetConversation
} from '@mp/app/inbox/util';
import produce from 'immer';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { InboxApi } from './inbox.api';
import { IUser } from '@mp/api/users/util';


export interface ConversationStateModel {
  conversation: IConversation | null;
  memberIds: string [] | null ;
  messageIds: string [] | null ;
}

/*export interface MessageStateModel {
  message: IMessage | null;
  content: IMessageContent | null ;
  metaData: IMessageMetaData | null;
}*/

@State<ConversationStateModel>({
  name: 'conversation',
  defaults: {
    conversation: null,
    memberIds: null, //get sender's userId?
    messageIds: null
  }
})

//should we create a message state and selector?
/*@State<MessageStateModel>({
  name: 'message',
  defaults: {
    message: null,
    content: null,
    metaData: null
  }
})*/


@Injectable()
export class InboxState {
  constructor(
    private readonly inboxApi: InboxApi,
    private readonly store: Store
  ) {}

  @Selector()
  static conversation(state: ConversationStateModel) {
    return state.conversation;
  }

  @Action(SendMessage)
  async sendMessage(ctx: StateContext<ConversationStateModel>) {
    try {
      const conversationState= ctx.getState();
      const conversationID=conversationState.conversation?.conversationID;
      const members=conversationState.conversation?.members;
      const messages=conversationState.conversation?.messages;
      if (!conversationID) {
        this.createConversation(ctx);
      }
      const request: ISendMessageRequest = {  //maybe we need to modify send-message.request.ts so that it refers to IMessage instead of IConversation
        conversation: {
          conversationID,
          members,
          messages
        }
      };
      const responseRef = await this.inboxApi.sendMessage(request);
      const response=responseRef.data;
      return ctx.setState(
        produce((draft) => {
          if (typeof response.message.id === "string" && draft.messageIds) {
            draft.messageIds.push(response.message.id);
          }
        })
      );
    } catch (error) {
        return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(CreateConversation)
  async createConversation(ctx: StateContext<ConversationStateModel>) {
    try {
      const conversationState= ctx.getState();
      const conversationID=conversationState.conversation?.conversationID;
      const members=conversationState.conversation?.members;
      const messages=conversationState.conversation?.messages;
      const request: ICreateConversationRequest = {
        conversation: {
          conversationID,
          members,
          messages
        }
      };
      const responseRef = await this.inboxApi.createConversation(request);
      const response = responseRef.data;
      return ctx.setState(
        produce((draft) => {
          draft.conversation = response.conversation;
        })
      );
      } catch (error) {
          return ctx.dispatch(new SetError((error as Error).message));
      }
  }

  @Action(DeleteMessage)
  async deleteMessage(ctx: StateContext<ConversationStateModel>, {messageToDelete}:DeleteMessage) {
    try {
      const conversationState= ctx.getState();
      const conversationID=conversationState.conversation?.conversationID;
      const members=conversationState.conversation?.members;
      if (!messageToDelete) {
        return ctx.dispatch(new SetError('No message to delete has been provided.'));
      }

      const request: IDeleteMessageRequest = {
        conversation: {
          conversationID,
          members,
          "messages" : [messageToDelete!]
        }
      };
      const responseRef = await this.inboxApi.deleteMessage(request);
      const response = responseRef.data;
      return ctx.setState(
        produce((draft) => {
          if (typeof response.message.id === "string" && draft.messageIds) {
            draft.messageIds=draft.messageIds.filter((item) => item !== response.message.id );
          }
        })
      );
    } catch (error) {
        return ctx.dispatch(new SetError((error as Error).message));
    }
  }

}
