import { Component, ViewChild } from '@angular/core';
import { IonToggle } from '@ionic/angular';

@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.page.html',
  styleUrls: ['./privacy-settings.page.scss'],
})
export class PrivacySettingsPageComponent { 
  activityStatus = true;
  hideComments = false;
  hideLikesDislikes = false;
  privateAccount = false;

  @ViewChild('ActivityToggle', { static: true }) ActivityToggle!: IonToggle;
  @ViewChild('CommentsToggle', { static: true }) CommentsToggle!: IonToggle;
  @ViewChild('LikesDislikesToggle', { static: true }) LikesDislikesToggle!: IonToggle;
  @ViewChild('PrivateToggle', { static: true }) PrivateToggle!: IonToggle;

  // constructor() {}

  ngOnInit() {
    const a = localStorage.getItem('activityStatus');
    const b = localStorage.getItem('hideComments');
    const c = localStorage.getItem('hideLikesDislikes');
    const d = localStorage.getItem('privateAccount');
  
    if (a) {
      if (a === 'true') {
        this.ActivityToggle.checked = true;
      }else{
        this.ActivityToggle.checked = false;
      }
    }

    if (b) {
      if (b === 'true') {
        this.CommentsToggle.checked = true;
      }else{
        this.CommentsToggle.checked = false;
      }
    }

    if (c) {
      if (c === 'true') {
        this.LikesDislikesToggle.checked = true;
      }else{
        this.LikesDislikesToggle.checked = false;
      }
    }

    if (d) {
      if (d === 'true') {
        this.PrivateToggle.checked = true;
      }else{
        this.PrivateToggle.checked = false;
      }
    }
  }

  onToggleActivity(event: any) {
    this.activityStatus = event.detail.checked;

    localStorage.setItem('activityStatus', JSON.stringify(this.activityStatus));

  }

  onTogglePrivate(event: any) {
    this.privateAccount = event.detail.checked;

    localStorage.setItem('privateAccount', JSON.stringify(this.privateAccount));
  }


  onToggleComments(event: any) {
    this.hideComments = event.detail.checked;

    localStorage.setItem('hideComments', JSON.stringify(this.hideComments));
  }

  onToggleLikesDislikes(event: any) {
    this.hideLikesDislikes = event.detail.checked;

    localStorage.setItem('hideLikesDislikes', JSON.stringify(this.hideLikesDislikes));
  }
}
