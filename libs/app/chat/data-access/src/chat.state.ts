import { Injectable, OnDestroy } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  DeleteMessage,
  GetCurrentChat,
  SendMessage,
  SetChat,
  SubscribeToChat,
} from '@mp/app/chat/util';
import {
  IConversation,
  IDeleteMessageRequest,
  IMessage,
  ISendMessageRequest,
} from '@mp/api/message/util';
import { ChatApi } from './chat.api';
import produce from 'immer';
import { SetError } from '@mp/app/errors/util';
import { InboxStateModel } from '@mp/app/inbox/data-access';
import { Subject } from 'rxjs';
import { InboxState } from '@mp/app/inbox/data-access';

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
  public chat$ = new Subject();
  public subscription: any;
  public cid: any;
  @Selector()
  static currentConversation(state: ChatStateModel) {
    return state.currentConversation;
  }
  OnDestroy() {
    this.subscription.unsubscribe();
  }

  @Action(GetCurrentChat)
  GetCurrentChat() {
    return this.chat$;
  }
  @Action(SubscribeToChat)
  async subscribeToChat(ctx: StateContext<InboxStateModel>) {
    // this.cid = ctx.getState().currentConversation?.conversationID;
    // if (!this.cid) {
    await this.store.select(InboxState.currentConversation).subscribe((x) => {
      if (x) {
        this.cid = x.conversationID;
        // console.log(x, 'xxxxxxxxlllllllllllllll');
      }
    });
    // }
    // ctx.setState(
    //   await produce((draft) => {
    //     draft.conversation = [];
    //     // draft.conversations = [];
    //     draft.currentConversation = null;
    //   })
    // );
    // await this.inboxApi.inbox(this.userId);
    console.log('in subscribe to chat ');
    await this.chatApi.chat(this.cid, this.chat$);
    console.log('return from chatAPI ');

    // const bb = this.inboxApi.getConversationObs();
    // bb.subscribe((x) => {
    if (this.subscription) this.subscription.unsubscribe();

    this.subscription = this.chat$.subscribe(async (a: any) => {
      ctx.setState(
        await produce((draft) => {
          const x = a;
          console.log(x, 'chat chat xxxxxxxxxxxxxxxxxxxxxxxxx');
          if (x[0]) {
            // if (x[0].type === 'added') {
            //   if (x[0].messages.length > 1) {
            //     draft.currentConversation.messages = x[0].messages;
            //   } else if (x[0].messages) {
            //     if (
            //       !draft.currentConversation.messages.some(
            //         (e: any) =>
            //           e.id === x[0].messages.id
            //       )
            //     ) {
            //       // console.log('does it push');
            //       draft.currentConversation.messages.push(x[0].messages);
            //     }
            //   } else {
            //     draft.currentConversation.messages = [];
            //   }
            // } else if (x[0].type === 'modified') {
            if (x[0].type === 'modified') {
              if (
                draft.currentConversation &&
                draft.currentConversation.messages
              ) {
                // const index = draft.currentConversation?.messages?.findIndex(
                // (e: any) => e.id === x[0].messages.id
                // );
                // console.log(index, 'kk#############');
                // console.log(
                // draft.currentConversation.messages[index],
                // '@@@@@@@@@@@@@@@@@@@@@@@@@@'
                // );
                // if (index > -1) {
                console.log(x[0].messages, ' modifying chat to draft');
                draft.currentConversation.messages = x[0].messages;
                // return;
                // } else {
                //deleted message
                // console.log('implement delteed: ', index);
                // }
              }

              // } else if (x[0].type === 'removed') {
              //   const index = draft.conversations.findIndex(
              //     (e: any) =>
              //       e.conversationID === x[0].conversations.conversationID
              //   );
              //   draft.conversations.splice(index, 1);
            }
            // else {
            //   console.log('inbox.state.subscribeToInbox undefined');
            //   draft.conversations = [];
            // }
          }
          // else {
          //   draft.conversations = [];
          // }
        })
      );
    });
    // return bb;
  }

  @Action(SendMessage)
  async sendMessage(
    ctx: StateContext<ChatStateModel>,
    { messageToAdd }: SendMessage
  ) {
    try {
      const chatState = ctx.getState();
      const conversationID = chatState.currentConversation?.conversationID;
      console.log('!!!!!!!!!!!!!!!!!', conversationID);
      const members = chatState.currentConversation?.members;
      const messages = chatState.currentConversation?.messages;
      // if (!conversationID) {
      // this.createConversation(ctx);
      // }
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
          if (draft.currentConversation) {
            if (draft.currentConversation.messages) {
              draft.currentConversation.messages.push(response.message);
            } else {
              draft.currentConversation.messages = response;
            }
          }
        })
      );
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(SetChat)
  async addMessage(
    ctx: StateContext<ChatStateModel>,
    { currentConversation }: SetChat
  ) {
    return ctx.setState(
      produce((draft) => {
        draft.currentConversation = currentConversation;
      })
    );
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
