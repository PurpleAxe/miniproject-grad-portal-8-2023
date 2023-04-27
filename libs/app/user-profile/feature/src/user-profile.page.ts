import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SharedPageComponent } from '@mp/app/shared/feature'
import { SharedModule } from '@mp/app/shared/feature';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePageComponent { 
  shared = new SharedPageComponent(new AlertController);

  constructor(private router: Router) { }

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
