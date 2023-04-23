import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import {MyPayload} from  '@mp/app/post/util';

import { CreatePost} from '@mp/app/post/util';
import { firestore } from 'firebase-admin';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPageComponent { 

  error="";
  body="";
  challenge="";
  department="";

  constructor(private router: Router, private readonly store: Store) { }
  
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  uploadPost(){

    if(this.body=="")
      return; //should challenge and department be optional?

    console.log("Post");
    console.log(this.body);

    const payload:MyPayload={
      body: this.body,
      department:this.department,
      challenge:this.challenge,
    }
    this.store.dispatch(new CreatePost(payload));

    this.router.navigate(['/home/feed']); //need to change to profile one day
  }
}
