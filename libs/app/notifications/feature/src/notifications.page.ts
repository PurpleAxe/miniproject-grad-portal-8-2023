import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { INotificationBox, INotifications } from '@mp/api/notifications/util';
import { NotificationsState } from '@mp/app/notifications/data-access';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { SubscribeToNotifications, MarkAsReadNotification } from '@mp/app/notifications/util';
import {NotificationsModule} from '@mp/app/notifications/data-access'
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPageComponent implements OnInit{
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

  constructor(
    private alertController: AlertController,
    private readonly store: Store
  ) { }

  getTime(notification: INotifications|null|undefined){
    console.log(notification);
    console.log(notification?.notificationTime);
    if (notification?.notificationTime?.seconds!=undefined){
      const notificationTime = new Date(notification?.notificationTime?.seconds*1000+notification?.notificationTime?.nanoseconds/1000000);
      return notificationTime.toString().substring(4,21);
    }
    return Date();
  }

  markAsRead(notification: INotifications|null|undefined){
    console.log("in markAsRead page.ts")
    console.log(notification);
    if (notification!=undefined){
      console.log(notification);
      // this.store.dispatch(new MarkAsReadNotification({notificationBox:null},notificationID));
      this.store.dispatch(new MarkAsReadNotification(notification));
    }
  }
  ngOnInit() {
    // this.setUserId();
    this.store.dispatch(new SubscribeToNotifications());
    console.log("notifications should be printed after this");
    console.log(this.notifications$);
  }
}

