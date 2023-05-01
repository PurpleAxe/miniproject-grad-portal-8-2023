import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserProfilePageRoutingModule } from './user-profile-routing.module';
import { UserProfilePageComponent } from './user-profile.page';
import { FeedModule, CardComponent } from '@mp/app/feed/ui';
import { FeedState, FeedApi } from '@mp/app/feed/data-access';
import { NgxsModule } from '@ngxs/store';
// import { SharedModule } from '@mp/app/shared/feature'
import { UserProfileModule as UserProfileDataAccessModule} from '@mp/app/user-profile/data-access';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FeedModule, UserProfilePageRoutingModule, UserProfileDataAccessModule ,NgxsModule.forFeature([FeedState])],
  declarations: [UserProfilePageComponent],
  exports: [UserProfilePageComponent],
  bootstrap:[CardComponent],
  providers: [FeedApi]
})
export class UserProfileModule {}
