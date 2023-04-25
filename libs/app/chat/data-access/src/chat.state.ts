import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { DeleteMessage, SendMessage } from '@mp/app/chat/util';
import {
  IConversation,
  IDeleteMessageRequest,
  ISendMessageRequest,
} from '@mp/api/message/util';
import { ChatApi } from './chat.api';
import produce from 'immer';
import { SetError } from '@mp/app/errors/util';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChatStateModel {
  currentConversation: any;
}

//TODO: update action and state model
@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    currentConversation: null,
  },
})
@Injectable()
export class ChatState {
  constructor(
    private readonly chatApi: ChatApi,
    private readonly store: Store
  ) {}
  @Action(SendMessage)
  async sendMessage(ctx: StateContext<ChatStateModel>, { messageToAdd }: SendMessage) {
    try {
      const chatState = ctx.getState();
      const conversationID = chatState.currentConversation?.conversationID;
      const members = chatState.currentConversation?.members;
      const messages = chatState.currentConversation?.messages;
      if (!conversationID) {
        // this.createConversation(ctx);
      }
      const request: ISendMessageRequest = {
        //maybe we need to modify send-message.request.ts so that it refers to IMessage instead of IConversation
        conversation: {
          conversationID,
          members,
          messages: [messageToAdd],
        },
      };
      const responseRef = await this.chatApi.sendMessage(request);
      const response = responseRef.data;
      return ctx.setState(
        produce((draft) => {
          draft.currentConversation = response as IConversation;
        })
      );
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  /*@Action(AddMessage)
  async addMessage(ctx: StateContext<ChatStateModel>, { messageToAdd }: AddMessage) {
    return ctx.setState(
      produce((draft) => {
      if(draft.currentConversation.messages){
        draft.currentConversation.messages.push(messageToAdd);
      } else {
        draft.currentConversation.messages=messageToAdd;
      }
      })
    );
  }*/

  @Action(DeleteMessage)
  async deleteMessage(
    ctx: StateContext<ChatStateModel>,
    { messageToDelete }: DeleteMessage
  ) {
    try {
      const chatState = ctx.getState();
      const conversationID = chatState.currentConversation?.conversationID;
      const members = chatState.currentConversation?.members;
      //const messages=chatState.currentConversation?.messages;
      if (!messageToDelete) {
        return ctx.dispatch(
          new SetError('No message to delete has been provided.')
        );
      }

      const request: IDeleteMessageRequest = {
        conversation: {
          conversationID,
          members,
          messages: [messageToDelete!], //need to query gustav on this
        },
      };
      const responseRef = await this.chatApi.deleteMessage(request);
      const response = responseRef.data;
      return ctx.setState(
        produce((draft) => {
          if (draft.currentConversation?.messages) {
            //need to query gustav on this
            // draft.currentConversation.messages =
            // draft.currentConversation.messages.filter(
            // (item) => item !== response.message
            // );
          }
        })
      );
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
