import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InboxModule as InboxUiModule } from '@mp/app/inbox/ui';
import { InboxModule as InboxModuleDataAccessModule } from '@mp/app/inbox/data-access';
import { InboxPageComponent } from './inbox.page';
import { InboxPageRoutingModule } from './inbox-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboxModuleDataAccessModule,
    InboxUiModule,
    InboxPageRoutingModule,
  ],
  exports: [],
  declarations: [InboxPageComponent],
})
export class InboxModule {}
