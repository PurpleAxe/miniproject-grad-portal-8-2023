import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { INotificationBox, INotifications } from '@mp/api/notifications/util';
import { NotificationsState } from '@mp/app/notifications/data-access';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPageComponent{
  @Select(NotificationsState.notificationBox) notifications$!: Observable<INotificationBox | null>;

  // segment = 'notifications';
  // // notificationBox = null;
  // notifications = [
  //   { read:true,
  //     message:"testing",
  //     url:"localhost:4200/home/motifications",
  //     notificationID:"mockdata1," },
  //   { read:false,
  //     message:"testing 2",
  //     url:"localhost:4200/home/motifications",
  //     notificationID:"mockdata2" }
  // ];

  // constructor(
  //   private alertController: AlertController,
  //   private readonly store: Store
  // ) { }

  // ngOnInit() {
  //   console.log(5);
  //   console.log(this.notifications);
  //   console.log(NotificationsState.notificationBox);
  //   // this.notifications=NotificationsState.notificationBoxInbox();
  //   // this.notificationBox=NotificationsState.notificationBox;
    
  //   // this.notifications=NotificationsState.notificationBox.inbox;
  // }
}

