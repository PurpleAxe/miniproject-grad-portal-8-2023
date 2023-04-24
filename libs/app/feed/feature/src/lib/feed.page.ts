import { Timestamp } from 'firebase-admin/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IIFeed } from '@mp/api/feed/util';
import { FeedState } from '@mp/app/feed/data-access';
import { FetchHomeFeed, FetchDiscoveryFeed} from '@mp/app/feed/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  contentArr: string[] = ["PostId1", "PostId2", "PostId3"];
  LHome!: boolean;
  LDiscovery!: boolean;

  text!: string;
  profileUrl="https://ionicframework.com/docs/img/demos/avatar.svg";
  date!:any;
  userName!:string;

  @Select(FeedState.getFeedPosts) post$! :Observable<IIFeed[]>;
  feed$:IIFeed[]=[];

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
    console.log(this.post$);
    console.log("Discover");
    this.contentArr.push("the_element");

  }

  homet(){
    console.log("Home");
    this.LHome = true;
    this.LDiscovery = false;
    this.store.dispatch(new FetchHomeFeed());
    this.displayFeed();
    console.log(this.post$);

  }

  displayFeed(){
    console.log("DISPLAY FEED");
    this.post$?.subscribe((res:any)=>{
      this.feed$=res;
    })
  }

  toDate(date:Timestamp | string | undefined){
    console.log(date);
    return "24 April";
  }

  getProfileUrl(userId:string){
    console.log(userId);
    return this.profileUrl;
  }

}
