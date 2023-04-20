import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChatStateModel {}

//TODO: update action and state model
@State<ChatStateModel>({
  name: 'replace me',
})
@Injectable()
export class ChatState {
  // add action here
  //  @Action(ContinueWithGoogle)
  //  async continueWithGoogle(ctx: StateContext<WelcomeStateModel>) {
  //    try {
  //      return ctx.dispatch(new AuthContinueWithGoogle());
  //    } catch (error) {
  //      return ctx.dispatch(new SetError((error as Error).message));
  //    }
  // }
}
