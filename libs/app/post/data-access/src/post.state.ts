import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import {Timestamp} from "firebase-admin/firestore";
import { 
    CreatePost
 } from '@mp/app/post/util';


export interface PostStateModel{
    Document:{
        UserId: string | null;
        Post : [{
            contents:{
                post: string | null;
                challenge: string | null;
                department: string | null;
            };
            timestamp: Timestamp | null;
        }]
    };
    dirty: false;
    status: string;
    errors: object;
  }


@State<PostStateModel>({
    name:"Post",
    defaults:{
        Document:{
            UserId: null,
            Post : [{
                contents:{
                    post: null,
                    challenge: null,
                    department: null,
                },
                timestamp: null,
            }]
        },
        dirty: false,
        status: '',
        errors: {},
    }
})


@Injectable()
export class PostState {

    @Action(CreatePost)
    async CreatePost(ctx: StateContext<PostStateModel>, {payload}: CreatePost) {
      console.log("post.state:" + payload.challenge);
      ctx.patchState({
        
      });
    }

  @Selector()
  static post(state: PostStateModel) 
  {
    return state.Document;
  }
}