import { Injectable } from '@angular/core';
import {
  IConversation,
  IMessage,
  ICreateConversationRequest,
  IDeleteMessageRequest,
  ISendMessageRequest,
  IMessageContent,
  IMessageMetaData,
} from '@mp/api/message/util';
import { AuthState } from '@mp/app/auth/data-access';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {
  SendMessage,
  CreateConversation,
  DeleteMessage,
  GetUsers,
} from '@mp/app/inbox/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { InboxApi } from './inbox.api';
import { IUser } from '@mp/api/users/util';

export interface InboxStateModel {
  currentConversation: IConversation | null;
  conversations: IConversation[] | null;
  users: IUser[] | null;
  //conversationIds: string | null;
  //messageIds: string [] | null;
}

@State<InboxStateModel>({
  name: 'inbox',
  defaults: {
    currentConversation: null,
    conversations: null,
    users: null
    //conversationIds: null,
    //messageIds: null
  },
})
@Injectable()
export class InboxState {
  constructor(
    private readonly inboxApi: InboxApi,
    private readonly store: Store
  ) {}

  @Selector()
  static conversation(state: InboxStateModel) {
    return state.currentConversation;
  }

  @Action(SendMessage)
  async sendMessage(ctx: StateContext<InboxStateModel>) {
    try {
      const inboxState = ctx.getState();
      const conversationID = inboxState.currentConversation?.conversationID;
      const members = inboxState.currentConversation?.members;
      const messages = inboxState.currentConversation?.messages;
      if (!conversationID) {
        this.createConversation(ctx);
      }
      const request: ISendMessageRequest = {
        //maybe we need to modify send-message.request.ts so that it refers to IMessage instead of IConversation
        conversation: {
          conversationID,
          members,
          messages,
        },
      };
      const responseRef = await this.inboxApi.sendMessage(request);
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

  @Action(CreateConversation)
  async createConversation(ctx: StateContext<InboxStateModel>) {
    try {
      const inboxState = ctx.getState();
      const conversationID = inboxState.currentConversation?.conversationID;
      const members = inboxState.currentConversation?.members;
      const messages = inboxState.currentConversation?.messages;
      const request: ICreateConversationRequest = {
        conversation: {
          conversationID,
          members,
          messages,
        },
      };
      const responseRef = await this.inboxApi.createConversation(request);
      const response = responseRef.data;
      return ctx.setState(
        produce((draft) => {
          if (draft.currentConversation) {
            if (!draft.conversations) {
              draft.conversations = [draft.currentConversation];
            } else {
              draft.conversations.push(draft.currentConversation);
            }
          }
          draft.currentConversation = response as IConversation;
        })
      );
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(DeleteMessage)
  async deleteMessage(
    ctx: StateContext<InboxStateModel>,
    { messageToDelete }: DeleteMessage
  ) {
    try {
      const inboxState = ctx.getState();
      const conversationID = inboxState.currentConversation?.conversationID;
      const members = inboxState.currentConversation?.members;
      //const messages=inboxState.currentConversation?.messages;
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
      const responseRef = await this.inboxApi.deleteMessage(request);
      const response = responseRef.data;
      return ctx.setState(
        produce((draft) => {
          if (draft.currentConversation?.messages) {
            //need to query gustav on this
            draft.currentConversation.messages =
              draft.currentConversation.messages.filter(
                (item) => item !== response.message
              );
          }
        })
      );
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
  
  @Action(GetUsers)
  async getUsers(ctx: StateContext<InboxStateModel>) {
    /*const inboxState = ctx.getState();
    const users = inboxState.users;
    if (!users) {
      return ctx.dispatch(
        new SetError('no users on app to chat to yet');
      );
    }
    const request: IGetUsersRequest = {
      userlist: {
        users:
      },
    };
    const responseRef = await this.inboxApi.getUsers(request);
    const response = responseRef.data;*/
    console.log('in getUser from inbox.state.ts');
    //console.log(responseRef);
    /*return ctx.setState(
      produce((draft) => {
        draft.users = response;
      })
    );
  } catch (error) {
    return ctx.dispatch(new SetError((error as Error).message));*/
  }
}
