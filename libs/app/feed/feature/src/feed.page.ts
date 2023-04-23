import { Observable } from 'rxjs';
import { FeedState, IFeed} from '@mp/app/feed/data-access';
import { FetchHomeFeedAction, FetchDiscoveryFeedAction} from '@mp/app/feed/util';
import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit{
  contentArr: string[] = ["Card1", "Card2"];
  LHome!: boolean;
  LDiscovery!: boolean;
  @Select(FeedState.getFeedPosts) post$! :Observable<IFeed>;

  constructor( private readonly store: Store){
    this.LHome = true;
    this.LDiscovery = false;
    this.store.dispatch(new FetchHomeFeedAction());
  }

  ngOnInit(){
    this.homet();
  }

  Discoveryt(){
    this.LHome = false;
    this.LDiscovery = true;
    console.log("Discover");
    this.store.dispatch(new FetchDiscoveryFeedAction());
  }

  homet(){
    console.log("Home");
    this.LHome = true;
    this.LDiscovery = false;
    this.store.dispatch(new FetchHomeFeedAction());
  }

}
