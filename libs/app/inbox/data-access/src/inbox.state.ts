import { Injectable } from '@angular/core';
import {
  IConversation,
  ICreateConversationRequest,
} from '@mp/api/message/util';
import { SetError } from '@mp/app/errors/util';
import {
  CreateConversation,
  GetConversation,
  //SubscribeToInbox,
  GetUserId,
  GetUsers,
  Logout,
  SetInbox,
  SubscribeToInbox,
  //SetInbox,
} from '@mp/app/inbox/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { InboxApi } from './inbox.api';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { AuthState } from '@mp/app/auth/data-access';
import { tap } from 'rxjs';
import { IProfile } from '@mp/api/profiles/util';

export interface InboxStateModel {
  currentConversation: IConversation | null;
  conversations: any;
  conversation:
    | { conversationId: string; messages: string[]; participants: string[] }[]
    | null;
  users: { id: number; displayName: string; photoURL: string }[] | null;
  members: { id: number; displayName: string; photoURL: string }[] | null;

  //appUser: IProfile;
  // user: User | undefined | null;
  //conversationIds: string | null;
  //messageIds: string [] | null;
}

@State<InboxStateModel>({
  name: 'inbox',
  defaults: {
    currentConversation: null,
    conversations: null,
    conversation: null,
    users: null,
    members: null,
    //appUser: null,
    // user: null,
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
  // public users!: Observable<User[]>;
  public userId!: string | undefined;
  // private item$: any;
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
  static users(state: InboxStateModel) {
    return state.users;
  }
  @Selector()
  static members(state: InboxStateModel) {
    return state.members;
  }

  @Action(SetInbox)
  // setConversation(
  //   ctx: StateContext<InboxStateModel>,
  //   { conversations }: SetInbox
  // ) {
  //   return ctx.setState(
  //     produce((draft) => {
  //       if (conversations) {
  //         console.log('conversations plz!!!!!!!!!!!!');
  //         console.log(conversations);
  //         draft.conversations = conversations;
  //       }
  //     })
  //   );
  // }
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
    await this.inboxApi.inbox(this.userId);
    const bb = this.inboxApi.getConversationObs();
    bb.subscribe((x) => {
      ctx.setState(
        produce((draft) => {
          draft.conversations = x;
        })
      );
    });
    return bb;
  }

  @Action(CreateConversation) //createconversation only called to add new conversation
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
      //ctx.dispatch(new SetInbox(response.conversation));
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
  @Action(Logout)
  async logout(ctx: StateContext<InboxStateModel>) {
    return ctx.dispatch(new AuthLogout());
  }

  // @Action(DeleteMessage)
  // async deleteMessage(
  //   ctx: StateContext<InboxStateModel>,
  //   { messageToDelete }: DeleteMessage
  // ) {
  //   try {
  //     const inboxState = ctx.getState();
  //     const conversationID = inboxState.currentConversation?.conversationID;
  //     const members = inboxState.currentConversation?.members;
  //     //const messages=inboxState.currentConversation?.messages;
  //     if (!messageToDelete) {
  //       return ctx.dispatch(
  //         new SetError('No message to delete has been provided.')
  //       );
  //     }

  //     const request: IDeleteMessageRequest = {
  //       conversation: {
  //         conversationID,
  //         members,
  //         messages: [messageToDelete!], //need to query gustav on this
  //       },
  //     };
  //     const responseRef = await this.inboxApi.deleteMessage(request);
  //     const response = responseRef.data;
  //     return ctx.setState(
  //       produce((draft) => {
  //         if (draft.currentConversation?.messages) {
  //           //need to query gustav on this
  //           draft.currentConversation.messages =
  //             draft.currentConversation.messages.filter(
  //               (item) => item !== response.message
  //             );
  //         }
  //       })
  //     );
  //   } catch (error) {
  //     return ctx.dispatch(new SetError((error as Error).message));
  //   }
  // }
  OnDestroy() {
    // this.item$.unsubscribe();
  }

  // @Action(GetUserId)
  // async getUserId() {
  //   return this.userId;
  // }
  // @Action(GetConversation)
  // async getConversation(ctx: StateContext<InboxStateModel>) {
  //   this.store
  //     .select(AuthState.user)
  //     .subscribe((x: any) => (this.userId = x?.uid));

  //   const res = await this.inboxApi.getConversation(this.userId);
  //   console.log(res, 'aaaaaaaaaaaaaaaaaaaaaaa');

  //   return ctx.setState(
  //     produce((draft) => {
  //       draft.conversations = Array.from(
  //         res.map(
  //           (item) => ({
  //             conversationId: item['conversationId'],
  //             messages: item['messages'],
  //             participants: item['participants'],
  //           })
  //           // items.map((item) => )
  //         )
  //       );
  //     })
  //   );

  //   // return this.users$;
  // }

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
    // console.log('in getUser from inbox.state.ts');
    // const responseRef = await this.inboxApi.getUsers();
    //console.log(responseRef);
    /*return ctx.setState(
      produce((draft) => {
        draft.users = response;
      })
    );
  } catch (error) {
    return ctx.dispatch(new SetError((error as Error).message));*/
    // if (this.store.select(AuthState.user)) {
    // let auth;
    // this.store.select(AuthState.user).pipe(
    // tap((x) => {
    // auth = x?.uid;
    // console.log(x, '!!!!!!!!!!!!!!!');
    // })
    // );
    // console.log(auth, 'aaaaaaaaaaaaaaaaa');
    //   this.users$ =
    // if (!InboxState.users) {

    // }
    // if (!this.users) {
    // this.users = await (

    //get userId
    this.store
      .select(AuthState.user)
      .subscribe((x: any) => (this.userId = x?.uid));

    const res = await this.inboxApi.getUsers(this.userId);

    return ctx.setState(
      produce((draft) => {
        draft.users = Array.from(
          res.map(
            (item) => ({
              id: item['id'],
              displayName: item['displayName'],
              photoURL: item['photoURL'],
            })
            // items.map((item) => )
          )

          // for (let i = 0; i < res.length; i++) {
          //   draft.users?.push({ id: res[i]['id'], name: res[i]['displayName'] });
          //   console.log(draft.users[i].name + ' was added');
          //   console.log('new size: ' + draft.users.length);
          // }
        );
      })
    );

    // return this.users$;
  }
  // , { email, password }: Login
  // @Action(setConvoMem)
  // async setConvoMem(ctx: StateContext<InboxStateModel>) {
  //   // this.store
  //   //   .select(AuthState.user)
  //   //   .subscribe((x: any) => (this.userId = x?.uid));

  //   console.log(ctx.getState().conversations, 'kkkkkkkkkkkkkkkkkkk');
  //   const res = await this.inboxApi.getMembersId(ctx.getState().conversations);

  //   return ctx.setState(
  //     produce((draft) => {
  //       draft.members = Array.from(
  //         res.map(
  //           (item) => ({
  //             id: item['id'],
  //             displayName: item['displayName'],
  //             photoURL: item['photoURL'],
  //           })
  //           // items.map((item) => )
  //         )

  //         // for (let i = 0; i < res.length; i++) {
  //         //   draft.users?.push({ id: res[i]['id'], name: res[i]['displayName'] });
  //         //   console.log(draft.users[i].name + ' was added');
  //         //   console.log('new size: ' + draft.users.length);
  //         // }
  //       );
  //     })
  //   );
  // }
}
