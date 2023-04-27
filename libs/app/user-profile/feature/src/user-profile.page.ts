import { Component, Renderer2 } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IProfile } from '@mp/api/profiles/util';
import { AuthState } from '@mp/app/auth/data-access';
import { ProfileState } from '@mp/app/profile/data-access';
import { SharedPageComponent } from '@mp/app/shared/feature'
import { SharedModule } from '@mp/app/shared/feature';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePageComponent { 
  shared = new SharedPageComponent(new AlertController);
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  @Select(AuthState.user) authProfile$!: Observable<User | null>;

  profileURL = "https://ionicframework.com/docs/img/demos/avatar.svg";
  bannerURL = "assets/images/placeholder.jpg";
  displayName : any;
  userName : any;

  constructor(private router: Router,private readonly store: Store,private renderer: Renderer2,) {

    this.profile$.subscribe((profile)=>{
      console.log(profile);
    });

    this.authProfile$.subscribe((var2) => {
      if (var2) {
        if (var2.email) {
          this.userName = var2.email?.substring(
            0,
            var2.email.indexOf('@')
          );
        }

        if (var2.displayName) {
          this.displayName = var2.displayName;
        }else{
          this.displayName = "invalid";
        }

        if (var2.photoURL) {
          this.profileURL = var2.photoURL;
        }
      }

      
    });
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

  
  

  ngOnInit() {
    console.log('UserProfilePageComponent');
    // localStorage.setItem('time', this.time.toString());
    this.shared.calculateTimeDifference();
    this.shared.decreaseTime('hours', 'minutes', 'ses');
  }

  ngOnDestroy() {
    clearTimeout(this.shared.timeoutId);
  }
}
