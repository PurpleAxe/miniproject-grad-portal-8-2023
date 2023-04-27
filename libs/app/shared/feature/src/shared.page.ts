import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.page.html',
  styleUrls: ['./shared.page.scss'],
})
export class SharedPageComponent {
  time = 4;
  timeoutId: any;
  alertPresented = false;

  constructor(private alertController: AlertController) { }

  calculateTimeDifference(): void {
    const currentTimestamp = Date.now();


    //this needs to change to db time!!!
    // Add 24 hours to the current timestamp (in milliseconds)
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes/hour * 60 seconds/minute * 1000 milliseconds/second
    const futureTimestamp = currentTimestamp + oneDayInMilliseconds;


    const timeDifferenceInSeconds = Math.round((futureTimestamp - currentTimestamp) / 1000);
    console.log(timeDifferenceInSeconds);
    this.time = timeDifferenceInSeconds;
  }
  
  decreaseTime(hoursId: string, minutesId: string, secondsId: string): void {
    this.timeoutId = setTimeout(() => {
  
      this.time--;
  
      const hours = Math.floor(this.time / 3600);
      const minutes = Math.floor((this.time % 3600) / 60);
      const seconds = Math.floor(this.time % 60);
      const hoursString = `${hours < 10 ? '0' : ''}${hours} hrs`;
      const minutesString = `${minutes < 10 ? '0' : ''}${minutes} mins`;
      const secondsString = `${seconds < 10 ? '0' : ''}${seconds} s`;
  
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
  
      this.setTime(this.time);
  
      if (this.time > 0) {
        // Call the decreaseTime function again if the time is not zero yet
        this.decreaseTime(hoursId, minutesId, secondsId);
      } else{
        console.log('The time has reached zero!');
        // this.presentAlert();
      }
      

    }, 1000);
    // Return false immediately after calling setTimeout,
    // since we don't know yet whether the time has reached zero or not
  }

  async presentAlert() {
    if (!this.alertPresented && this.time === 0) {
      this.alertPresented = true;
  
      const alert = await this.alertController.create({
        header: 'Time Out!',
        subHeader: 'Your time has run out.',
        message: 'Ask a friend to add more time for you.',
        buttons: [{
          text: 'Ask a friend',
          handler: () => {
            this.alertPresented = false;
            this.calculateTimeDifference();
            this.decreaseTime('hours', 'minutes', 'ses');
          }
        }],
        backdropDismiss: false // prevent dismissing by clicking outside of the alert
      });
  
      await alert.present();
    }
  }
  

  setTime(time: number){
    //this needs to change to setting db time!!!
    this.time = time;
  }


  
}
