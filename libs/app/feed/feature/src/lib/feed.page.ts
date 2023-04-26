import { Timestamp } from 'firebase-admin/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedState } from '@mp/app/feed/data-access';
import { FetchHomeFeed, FetchDiscoveryFeed} from '@mp/app/feed/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IPost } from '@mp/api/post/util';


@Component({
  selector: 'feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  // contentArr: string[] = ["PostId1", "PostId2", "PostId3"];
  LHome!: boolean;
  LDiscovery!: boolean;

  text!: string;
  profileUrl="https://ionicframework.com/docs/img/demos/avatar.svg";
  date!:any;
  userName!:string;

  @Select(FeedState.getFeedPosts) post$! :Observable<IPost[]>;
  feed$:IPost[]=[];

  constructor(private router: Router,private readonly store: Store){
    this.LHome = true;
    this.LDiscovery = false;
    this.store.dispatch(new FetchHomeFeed());
  }

  ngOnInit(): void {
    this.homet();
  }


  Discoveryt(){
    this.LHome = false;
    this.LDiscovery = true;
    console.log("Discovery");
    this.store.dispatch(new FetchDiscoveryFeed());
    this.displayFeed();
    // this.contentArr.push("the_element");

  }

  homet(){
    console.log("Home");
    this.LHome = true;
    this.LDiscovery = false;
    this.store.dispatch(new FetchHomeFeed());
    this.displayFeed();
  }

  displayFeed(){
    console.log("DISPLAY FEED");
    this.post$?.subscribe((res:any)=>{
      this.feed$=res;
    })
  }

  toDate(date:Timestamp | null | undefined){
    //console.log(date);
    return "24 April";
  }

  getProfileUrl(userId:string){
    return this.profileUrl;
  }

}
