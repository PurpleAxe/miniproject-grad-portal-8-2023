import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserProfilePageRoutingModule } from './user-profile-routing.module';
import { UserProfilePageComponent } from './user-profile.page';
// import { SharedModule } from '@mp/app/shared/feature'
import { UserProfileModule as UserProfileDataAccessModule} from '@mp/app/user-profile/data-access';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, UserProfilePageRoutingModule,  UserProfileDataAccessModule],
  declarations: [UserProfilePageComponent],
  exports: [UserProfilePageComponent], //ask why this is here
})
export class UserProfileModule {}
