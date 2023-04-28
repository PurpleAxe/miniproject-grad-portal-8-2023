import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserProfilePageRoutingModule } from './user-profile-routing.module';
import { UserProfilePageComponent } from './user-profile.page';
import { FeedModule, CardComponent } from '@mp/app/feed/ui';
import { FeedState, FeedApi } from '@mp/app/feed/data-access';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FeedModule, UserProfilePageRoutingModule,NgxsModule.forFeature([FeedState])],
  declarations: [UserProfilePageComponent],
  exports: [UserProfilePageComponent],
  bootstrap:[CardComponent],
  providers: [FeedApi]
})
export class UserProfileModule {}
