import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserListModule } from './user-list';

@NgModule({
  imports: [CommonModule, IonicModule, UserListModule],
  exports: [UserListModule],
})
export class InboxModule {}
