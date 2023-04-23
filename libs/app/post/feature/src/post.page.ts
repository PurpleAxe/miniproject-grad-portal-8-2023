import { Timestamp } from 'firebase-admin/firestore';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< Updated upstream
import { CreatePostAction} from '@mp/app/post/util';
import { actionsExecuting, ActionsExecuting } from '@ngxs-labs/actions-executing';
import { Select,Store } from '@ngxs/store';
import { Observable } from 'rxjs';




=======
import { Select, Store } from '@ngxs/store';
import {MyPayload} from  '@mp/app/post/util';
import { CreatePostAction} from '@mp/app/post/util';
import { Timestamp } from 'firebase-admin/firestore';
>>>>>>> Stashed changes


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPageComponent {

  @Select(actionsExecuting([CreatePostAction]))
  post$!: Observable<ActionsExecuting>;
  error="";
  body='';
  challenge='';
  department='';
  
  constructor(private router: Router, private readonly store: Store) {
    //
  }

  createPost(){
    
    if(this.body=="")
      return;
    const timestamp = Timestamp.now();

    const payload={
      body: this.body,
      department:this.department,
      challenge:this.challenge,
      timestamp:timestamp
    }
    this.store.dispatch(new CreatePostAction(payload));
  }

  
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
<<<<<<< Updated upstream
=======

  uploadPost(){

    if(this.body=="")
      return; //should challenge and department be optional?

    console.log("Post");
    console.log(this.body);


    const payload:MyPayload={
      body: this.body,
      department:this.department,
      challenge:this.challenge,
      //timestamp: Timestamp.now()
    }
    console.log(payload);
    this.store.dispatch(new CreatePostAction(payload));

    this.router.navigate(['/home/feed']); //need to change to profile one day
  }
>>>>>>> Stashed changes
}
