import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase-admin/firestore';
import { Select,Store } from '@ngxs/store';
// import { CreatePost} from '@mp/app/post/util';

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

  constructor(private router: Router) { }
  
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  uploadPost(){

    if(this.body=="")
      return; //should challenge and department be optional?

    console.log("Post");
    this.router.navigate(['/home/feed']); //need to change to profileone day

  //   const timestamp = Timestamp.now();

  //   const payload={
  //     body: this.body,
  //     department:this.department,
  //     challenge:this.challenge,
  //     timestamp:timestamp
  //   }
  //   this.store.dispatch(new CreatePost(payload));
  }
}
