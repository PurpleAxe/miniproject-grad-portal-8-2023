import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchPostsRequestAction, Post } from '@mp/app/post/util';
import { Store } from '@ngxs/store';

@Component({
  selector: 'feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {
  contentArr: string[] = ["Card1", "Card2"];
  LHome!: boolean;
  LDiscovery!: boolean;

  constructor( private readonly store: Store){
    this.LHome = true;
    this.LDiscovery = false;
    this.store.dispatch(new FetchPostsRequestAction("feed",this));
  }
  Discoveryt(){
    this.LHome = false;
    this.LDiscovery = true;
    console.log("Discover");
    //this.store.dispatch(new FetchProfilesAction());
  }

  homet(){
    console.log("Home");
    this.LHome = true;
    this.LDiscovery = false;
    this.store.dispatch(new FetchPostsRequestAction("feed",this));
  }

  loadPosts(posts:Post[]){
    //
  }

}
