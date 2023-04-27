import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserProfilePageRoutingModule } from './user-profile-routing.module';
import { UserProfilePageComponent } from './user-profile.page';
import { SharedModule } from '@mp/app/shared/feature'

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, UserProfilePageRoutingModule, SharedModule],
  declarations: [UserProfilePageComponent],
  exports: [UserProfilePageComponent],
})
export class UserProfileModule {}
