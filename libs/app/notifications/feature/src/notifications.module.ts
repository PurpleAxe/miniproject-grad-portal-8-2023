import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificationsPageRoutingModule } from './notifications-routing.module';
import { NotificationsPageComponent } from './notifications.page';
import {NotificationsModule as NotificationsDataAccessModule} from '@mp/app/notifications/data-access';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule,
    NotificationsDataAccessModule
  ],
  declarations: [NotificationsPageComponent],
  exports: [NotificationsPageComponent],
})
export class NotificationsModule { }
