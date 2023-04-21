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
} from '@mp/app/inbox/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { InboxApi } from './inbox.api';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { AuthState } from '../../../auth/data-access/src/auth.state';

export interface InboxStateModel {
  currentConversation: IConversation | null;
  conversations: IConversation[] | null;
  users: { id: number; displayName: string; photoURL: string }[] | null;
  // user: User | undefined | null;
  //conversationIds: string | null;
  //messageIds: string [] | null;
}

@State<InboxStateModel>({
  name: 'inbox',
  defaults: {
    currentConversation: null,
    conversations: null,
    users: null,
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
  static conversation(state: InboxStateModel) {
    return state.currentConversation;
  }
  @Selector()
  static users(state: InboxStateModel) {
    return state.users;
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
}
