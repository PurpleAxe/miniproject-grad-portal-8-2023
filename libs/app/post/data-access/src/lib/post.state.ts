import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { 
    SwipeAccept,
    SwipeReject,
    FilterCards
 } from '@mp/app/post/util';

export interface PostStateModel{
  post:{
    model:{
      users: any[] | null;
    };
    dirty: false;
    status: string;
    errors: object;
  }
}

@State<PostStateModel>({
    name: 'post',
    defaults: {
      post:{
        model:{
          users: null,
        },
        dirty: false,
        status: '',
        errors: {}
      }
    }
})
@Injectable()
export class PostState {

  @Action(SwipeAccept)
  async SwipeAccept(ctx: StateContext<PostStateModel>, {payload}: SwipeAccept) {
    //Works and catches Chat id
    ctx.patchState({
      
    });
  }

  @Action(SwipeReject)
  async SwipeReject(ctx: StateContext<PostStateModel>, {payload}: SwipeReject) {
    //Works and catches Chat id and outGoingMessage
    ctx.patchState({
      
    });
  }

  @Action(FilterCards)
  async FilterCards(ctx: StateContext<PostStateModel>, {payload}: FilterCards) {
    //Works and catches Chat id and time
    ctx.patchState({
      
    });
  }


  @Selector()
  static post(state: PostStateModel) 
  {
    return state.post.model;
  }
}