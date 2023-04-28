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
            postId: string | null;
            contents:{
                post: string | null;
                challenge: string | null;
                department: string | null;
            };
            likedProfileIds: string[];
            dislikedProfileIds: string[];
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
                postId: null,
                contents:{
                    post: null,
                    challenge: null,
                    department: null,
                },
                likedProfileIds: [],
                dislikedProfileIds: [],
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
      //catches like
      ctx.patchState({
        
      });
    }

  @Selector()
  static post(state: PostStateModel) 
  {
    return state.Document;
  }
}