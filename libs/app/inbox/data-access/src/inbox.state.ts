import { Injectable } from '@angular/core';
import {
  IConversation,
  ICreateConversationRequest,
} from '@mp/api/message/util';
import { SetError } from '@mp/app/errors/util';
import {
  CreateConversation,
  GetUserId,
  GetUsers,
  Logout,
  SetInbox,
  SetcurrentConversation,
  SubscribeToInbox,
  getCurrentConversation,
} from '@mp/app/inbox/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { InboxApi } from './inbox.api';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { AuthState } from '@mp/app/auth/data-access';
import { Observable } from 'rxjs';
import { IUser } from '@mp/api/users/util';
import { Subject } from 'rxjs';

export interface InboxStateModel {
  currentConversation: IConversation | null;
  conversations: any;
  conversation:
    | { conversationId: string; messages: string[]; participants: string[] }[]
    | null;
  users: { id: number; displayName: string; photoURL: string }[] | null;
  members: IUser[] | null;
}

@State<InboxStateModel>({
  name: 'inbox',
  defaults: {
    currentConversation: null,
    conversations: null,
    conversation: null,
    users: null,
    members: null,
  },
})
@Injectable()
export class InboxState {
  constructor(
    private readonly inboxApi: InboxApi,
    private readonly store: Store
  ) {}
  public userId!: string | undefined;
  public conversations$ = new Subject();
  public subscription: any;
  public currentConversation$!: Observable<any>;
  @Selector()
  static conversations(state: InboxStateModel) {
    return state.conversations;
  }

  @Selector()
  static currentConversation(state: InboxStateModel) {
    return state.currentConversation;
  }

  @Selector()
  static conversation(state: InboxStateModel) {
    return state.conversation;
  }

  @Selector()
  static members(state: InboxStateModel) {
    return state.members;
  }

  @Selector()
  static users(state: InboxStateModel) {
    return state.users;
  }
  @Action(getCurrentConversation)
  getCurrentConversation() {
    return this.currentConversation$;
  }
  @Action(GetUserId)
  async getUserId() {
    if (!this.userId) {
      this.store
        .select(AuthState.user)
        .subscribe((x: any) => (this.userId = x?.uid));
    }
  }

  @Action(SubscribeToInbox)
  async subscribeToInbox(ctx: StateContext<InboxStateModel>) {
    await this.getUserId();
    ctx.setState(
      await produce((draft) => {
        draft.conversation = [];
        draft.currentConversation = null;
      })
    );
    await this.inboxApi.inbox(this.userId, this.conversations$);
    if (this.subscription) this.subscription.unsubscribe();

    this.subscription = this.conversations$.subscribe(async (a: any) => {
      ctx.setState(
        await produce((draft) => {
          const x = a;
          if (x[0]) {
            if (x[0].type === 'added') {
              if (x[0].conversations.length > 1) {
                draft.conversations = x[0].conversations;
              } else if (
                x[0].conversations &&
                x[0].conversations.conversationID
              ) {
                if (
                  !draft.conversations.some(
                    (e: any) =>
                      e.conversationID === x[0].conversations.conversationID
                  )
                ) {
                  draft.conversations.push(x[0].conversations);
                }
              } else {
                draft.conversations = [];
              }
            } else if (x[0].type === 'modified') {
              const index = draft.conversations.findIndex(
                (e: any) =>
                  e.conversationID === x[0].conversations.conversationID
              );
              if (index > -1) {
                draft.conversations[index] = x[0].conversations;
                return;
              }
            } else if (x[0].type === 'removed') {
              const index = draft.conversations.findIndex(
                (e: any) =>
                  e.conversationID === x[0].conversations.conversationID
              );
              draft.conversations.splice(index, 1);
            } else {
              draft.conversations = [];
            }
          } else {
            draft.conversations = [];
          }
        })
      );
    });
  }

  @Action(SetcurrentConversation)
  async setcurrentConversation(
    ctx: StateContext<InboxStateModel>,
    { currentConversation }: SetcurrentConversation
  ) {
    return ctx.setState(
      produce((draft) => {
        draft.currentConversation = currentConversation;
      })
    );
  }

  @Action(CreateConversation)
  async createConversation(
    ctx: StateContext<InboxStateModel>,
    { member }: CreateConversation
  ) {
    try {
      const inboxState = ctx.getState();
      const conversationID = inboxState.currentConversation?.conversationID;
      const members = member;
      const messages = inboxState.currentConversation?.messages;
      const membersID = [members![0].id, members![1].id];
      const request: ICreateConversationRequest = {
        conversation: {
          conversationID,
          members,
          messages,
          membersID,
        },
      };
      const responseRef = await this.inboxApi.createConversation(request);
      const response = responseRef.data;
      ctx.setState(
        produce((draft) => {
          draft.currentConversation = response as IConversation;
        })
      );
      return response;
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
  @Action(Logout)
  async logout(ctx: StateContext<InboxStateModel>) {
    return ctx.dispatch(new AuthLogout());
  }

  OnDestroy() {
    this.subscription.unsubscribe();
  }

  @Action(GetUsers)
  async getUsers(ctx: StateContext<InboxStateModel>) {
    this.store
      .select(AuthState.user)
      .subscribe((x: any) => (this.userId = x?.uid));

    const res = await this.inboxApi.getUsers(this.userId);

    return ctx.setState(
      produce((draft) => {
        draft.users = Array.from(
          res.map((item) => ({
            id: item['id'],
            displayName: item['displayName'],
            photoURL: item['photoURL'],
          }))
        );
      })
    );
  }
}
