import { Component, Renderer2, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IPost } from '@mp/api/post/util';
import { FeedState } from '@mp/app/feed/data-access';
import { FetchOwnPosts, ILikedAndDisliked } from '@mp/app/feed/util';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import {DocumentReference} from '@angular/fire/firestore';

import { AlertController } from '@ionic/angular';
import { AuthState } from '@mp/app/auth/data-access';
import { UserProfileState } from '@mp/app/user-profile/data-access';
// import { SharedModule } from '@mp/app/shared/feature';
import { Logout } from '@mp/app/auth/util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePageComponent implements OnInit {

  @Select(FeedState.getFeedPosts) post$! :Observable<DocumentReference[]>;
  ownPost$:DocumentReference[]=[];
  profileUrl="https://ionicframework.com/docs/img/demos/avatar.svg";
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @Select(FeedState.likedAndDisliked) likedAndDisliked$!:Observable<ILikedAndDisliked>;
  uid!:string;
  username!:string;
  userProfile!:IProfile;
  liked$:string[]=[];
  disliked$:string[]=[];

  ngOnInit(): void {
    this.store.dispatch(new SubscribeToProfile());
    this.ownPosts();
    this.likedAndDisliked$.subscribe((update) => {
      const toLiked:string[] = [];
      update.liked.forEach((data) => {
        toLiked.push(data.id)
      });
      this.liked$ = toLiked;
      const toDisliked:string[] = [];
      update.disliked.forEach((data) => {
        toDisliked.push(data.id)
      });
      this.disliked$ = toDisliked;
    });
  }
  @Select(UserProfileState.userProfile)
  userProfile$!: Observable<IProfile | null>;

  @Select(AuthState.user) authProfile$!: Observable<User | null>;

  profileURL = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  bannerURL = 'assets/images/placeholder.jpg';
  displayName: any;
  userName: any;

  constructor(
    private router: Router,
    private readonly store: Store,
    private renderer: Renderer2,
    private alertController: AlertController
  ) {



    // this.profile$.subscribe((profile)=>{
    //   // console.log(profile);
    // });

    this.authProfile$.subscribe((var2) => {
      if (var2) {
        if (var2.email) {
          this.userName = var2.email?.substring(0, var2.email.indexOf('@'));
        }

        if (var2.displayName) {
          this.displayName = var2.displayName;
        } else {
          this.displayName = 'invalid';
        }

        if (var2.photoURL) {
          this.profileURL = var2.photoURL;
        }
      }
    });
  }

  //  logout() {
  //   // this.popover.dismiss();
  //   this.store.dispatch(new Logout());
  // }

  //  async presentAlert() {
  //   const alert = await this.alertController.create({
  //   header: 'Time Out!',
  //   subHeader: 'Your time has run out.',
  //   message: 'You have run out of time. Your account is no longer in use.',
  //   buttons: [{
  //   text: 'LOGOUT',
  //   handler: () => {
  //   this.logout();
  //   }
  //   }],
  //   backdropDismiss: false // prevent dismissing by clicking outside of the alert
  //   });

  //   await alert.present();
  // }

  getSeconds(profile: IProfile) {
    //SharedModule.se
    if (profile.timeLeft?.seconds != undefined) {
      const seconds =
        (profile.timeLeft?.seconds - Timestamp.now().seconds) % 60;
      // console.log(profile.timeLeft?.seconds-Timestamp.now().seconds);
      // if (profile.timeLeft?.seconds-Timestamp.now().seconds<=0){
      //   this.presentAlert();
      // }
      return seconds;
    }
    return 0;
  }

  getMinutes(profile: IProfile) {
    if (profile.timeLeft?.seconds != undefined) {
      const minutes = Math.floor(
        ((profile.timeLeft?.seconds - Timestamp.now().seconds) % 3600) / 60
      );
      return minutes;
    }
    return 0;
  }

  getHours(profile: IProfile) {
    if (profile.timeLeft?.seconds != undefined) {
      const hours = Math.floor(
        (profile.timeLeft?.seconds - Timestamp.now().seconds) / 3600
      );
      return hours;
    }
    return 0;
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  checkFollowers() {
    // this.router.navigate(['followers']);
  }

  checkFollowing() {
    // this.router.navigate(['followers']);
  }

  ownPosts(){
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if(profile != null){
        this.uid = profile.userId;
        this.userProfile = profile;
        if(profile.accountDetails){
          if (profile.accountDetails.displayName)
            this.username = profile.accountDetails.displayName;
        }

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
    // this.store.dispatch(new FetchOwnPosts({uid:""}));
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
    if(this.userProfile?.accountDetails?.photoURL){
      this.profileUrl = this.userProfile?.accountDetails?.photoURL;
    }
    return this.profileUrl;
  }
  isLiked(id:string) :boolean{
    return this.liked$.indexOf(id) !== -1;
  }

  isDisliked(id:string) :boolean{
    return this.disliked$.indexOf(id) !== -1;
  }
}
