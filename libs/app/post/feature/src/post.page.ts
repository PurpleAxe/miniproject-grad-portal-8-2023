import { Timestamp } from 'firebase-admin/firestore';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreatePostAction} from '@mp/app/post/util';
import { actionsExecuting, ActionsExecuting } from '@ngxs-labs/actions-executing';
import { Select,Store } from '@ngxs/store';
import { Observable } from 'rxjs';






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
}
