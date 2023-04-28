import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MyPayload} from  '@mp/app/post/util';
import { CreatePost} from '@mp/app/post/util';
import { Select, Store } from '@ngxs/store';
import { Timestamp } from '@angular/fire/firestore';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import { Observable } from 'rxjs';




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
  uid!:string;
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  

  constructor(private router: Router, private readonly store: Store) { 
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if(profile != null)
        this.uid = profile.userId;
    });
  }
  
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  uploadPost(){

    if(!/\S/.test(this.body) && !!/\S/.test(this.department) && !/\S/.test(this.challenge))
      return;//should challenge and department be optional?


      
    const payload:MyPayload={
      body: this.body,
      department:this.department,
      challenge:this.challenge,
      userId:this.uid,
      timestamp:Timestamp.fromDate(new Date())
    }
    this.store.dispatch(new CreatePost(payload));

    this.router.navigate(['/home/userprofile']);
  }
}