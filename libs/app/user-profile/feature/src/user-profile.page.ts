import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from '@mp/api/post/util';
import { FeedState } from '@mp/app/feed/data-access';
import { FetchOwnPosts } from '@mp/app/feed/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Timestamp } from 'firebase-admin/firestore';

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
    this.store.dispatch(new FetchOwnPosts());
    this.displayOwnPosts();
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
