import { Component } from '@angular/core';
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
export class FeedPage {
  contentArr: string[] = ["PostId1", "PostId2", "PostId3"];
  LHome!: boolean;
  LDiscovery!: boolean;
  @Select(FeedState.getFeedPosts) post$! :Observable<IIFeed>;

  constructor(private router: Router,private readonly store: Store){
    this.LHome = true;
    this.LDiscovery = false;
    this.store.dispatch(new FetchHomeFeed());
  }
  Discoveryt(){
    this.LHome = false;
    this.LDiscovery = true;
    console.log("Discovery");
    this.store.dispatch(new FetchDiscoveryFeed());
    console.log(this.post$);
    console.log("Discover");
    this.contentArr.push("the_element");

  }

  homet(){
    console.log("Home");
    this.LHome = true;
    this.LDiscovery = false;
    this.store.dispatch(new FetchHomeFeed());
    console.log(this.post$);

  }

  

}
