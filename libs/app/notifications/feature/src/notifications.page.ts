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
export class NotificationsPageComponent {
  @Select(NotificationsState.notificationBox) notifications$!: Observable<INotificationBox | null>;

  constructor(
    private alertController: AlertController,
    private readonly store: Store
  ) { }

  ngOnInit() {
    console.log(this.notifications$);
  }
}

