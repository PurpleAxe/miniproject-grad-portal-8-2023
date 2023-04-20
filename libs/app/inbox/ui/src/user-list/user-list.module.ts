import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InboxModule } from '@mp/app/inbox/data-access';
// import { NgxsFormPluginModule } from '@ngxs/form-plugin';
// import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { UserListComponent } from './user-list.component';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    IonicModule,
    // NgxSkeletonLoaderModule,
    // NgxsFormPluginModule,
    // ReactiveFormsModule,
    InboxModule,
  ],
  exports: [UserListComponent],
})
export class UserListModule {}
