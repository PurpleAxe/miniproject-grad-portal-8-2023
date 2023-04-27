import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserProfilePageRoutingModule } from './user-profile-routing.module';
import { UserProfilePageComponent } from './user-profile.page';
import { FeedModule, CardComponent } from '@mp/app/feed/ui';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FeedModule, UserProfilePageRoutingModule],
  declarations: [UserProfilePageComponent],
  exports: [UserProfilePageComponent],
  bootstrap:[CardComponent]
})
export class UserProfileModule {}
