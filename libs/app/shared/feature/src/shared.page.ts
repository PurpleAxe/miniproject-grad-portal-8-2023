import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Logout } from '@mp/app/auth/util';
import { Store } from '@ngxs/store';
import { time } from 'console';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.page.html',
  styleUrls: ['./shared.page.scss'],
})
export class SharedPageComponent {
 
  timeoutId: any;
  alertPresented = false;
  hoursId:any;
  minutesId:any;
  secondsId:any;

  // public setToFireStoreTime(time: number){
  //   this.time=time;
  // }


  constructor(private alertController: AlertController, private readonly store: Store,) { }


  
  //It is no longer necessary to decrease the time since we have a due date from firestore.
  decreaseTime(hoursId: string, minutesId: string, secondsId: string, h: any, m:any, s:any): void {


      this.hoursId = hoursId;
      this.minutesId = minutesId;
      this.secondsId = secondsId;
  
      const hoursString = `${h < 10 ? '0' : ''}${h} hrs`;
      const minutesString = `${m < 10 ? '0' : ''}${m} mins`;
      const secondsString = `${s < 10 ? '0' : ''}${s} s`;
  
      const HElement = document.getElementById(hoursId);
      if (HElement) {
        HElement.textContent = `${hoursString}`;
      }
  
      const MElement = document.getElementById(minutesId);
      if (MElement) {
        MElement.textContent = `${minutesString}`;
      }
  
      const SElement = document.getElementById(secondsId);
      if (SElement) {
        SElement.textContent = `${secondsString}`;
      }

  }

  
}
