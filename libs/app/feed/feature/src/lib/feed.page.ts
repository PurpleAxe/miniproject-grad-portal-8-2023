import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {
  contentArr: string[] = ["PostId1", "PostId2", "PostId3"];
  LHome!: boolean;
  LDiscovery!: boolean;

  constructor(private router: Router){
    this.LHome = true;
    this.LDiscovery = false;
  }
  Discoveryt(){
    this.LHome = false;
    this.LDiscovery = true;
    console.log("Discover");
    this.contentArr.push("the_element");

  }

  homet(){
    console.log("Home");
    this.LHome = true;
    this.LDiscovery = false;
  }

  

}
