import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from '@mp/api/post/util';
import { FeedState } from '@mp/app/feed/data-access';
import { FetchOwnPosts } from '@mp/app/feed/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Timestamp } from 'firebase-admin/firestore';

import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePageComponent implements OnInit { 

  constructor(private router: Router,private readonly store: Store) { }
  @Select(FeedState.getFeedPosts) post$! :Observable<IPost[]>;
  ownPost$:IPost[]=[];
  profileUrl="https://ionicframework.com/docs/img/demos/avatar.svg";
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  uid!:string;

  ngOnInit(): void {
    this.ownPosts();
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;

  }

  checkFollowers(){
    // this.router.navigate(['followers']);
  }

  checkFollowing(){
    // this.router.navigate(['followers']);
  }

  ownPosts(){
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if(profile != null){
        this.uid = profile.userId;
        // this.uid = "1";
        const payload={
          uid:this.uid
        };

        this.store.dispatch(new FetchOwnPosts(payload));
        this.post$.subscribe((posts) => {
          if(posts != null)
            this.ownPost$ = posts;
      });
    }
  });
    this.displayOwnPosts();
  }
  formatDateFromNanoseconds(seconds: number, nanoseconds: number): string {
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  displayOwnPosts(){
    console.log("DISPLAY OWN POSTS");
    this.post$?.subscribe((res:any)=>{
      this.ownPost$=res;
    })
  }

  toDate(date:Timestamp | null | undefined){
    console.log(date);
    return "24 April";
  }

  getProfileUrl(userId:string){
    //console.log(userId);
    return this.profileUrl;
  }
}
