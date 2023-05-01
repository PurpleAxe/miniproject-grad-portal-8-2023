import { DocumentReference, Timestamp } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedState } from '@mp/app/feed/data-access';
import { FetchHomeFeed, FetchDiscoveryFeed} from '@mp/app/feed/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IPost } from '@mp/api/post/util';

import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import {AuthState} from '@mp/app/auth/data-access';


@Component({
  selector: 'feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {
  LHome: boolean = true;
  LDiscovery: boolean = false;

  text!: string;
  userName!:string;
  now:Timestamp | null | undefined;
  challenge!:string;
  department!:string;
  profile!:string;

  @Select(FeedState.getFeedPosts) post$! :Observable<DocumentReference[]>;
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  feedPost$:DocumentReference[]=[];
  subscriptions:any;

  constructor(private router: Router,private readonly store: Store){
  }

  ngOnInit() {
    this.homet()
    this.store
        .select(AuthState.user)
        .subscribe((x: any) => (this.profile = x?.uid));
  }

  Discoveryt(){
    if (this.subscriptions) {
      this.subscriptions();
    }
    this.LHome = false;
    this.LDiscovery = true;
    const payload={
      uid:this.profile
    };
    this.store.dispatch(new FetchDiscoveryFeed(payload));
    // this.store.dispatch(new FetchDiscoveryFeed({uid:""}));
    this.subscriptions = this.post$.subscribe((posts) =>{
      if(posts != null)
        this.feedPost$ = posts;
    })
    this.displayFeed();
  }

  ngOnDestory() {
    if (this.subscriptions) {
      this.subscriptions();
    }
  }

  homet(){
    if (this.subscriptions) {
      this.subscriptions();
    }
    console.log("Home");
    this.LHome = true;
    this.LDiscovery = false;
    //this.store.dispatch(new FetchHomeFeed());

    const payload={
      uid:this.profile
    };

    this.store.dispatch(new FetchHomeFeed(payload));
    this.subscriptions = this.post$.subscribe((posts) =>{
      if(posts != null)
        this.feedPost$ = posts;
    })
    this.displayFeed();
  }

  displayFeed(){
    console.log("DISPLAY FEED");
    console.table(this.feedPost$);
  }
}
