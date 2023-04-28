import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { UserProfileState } from './user-profile.state';
import { UserProfilesApi } from './user-profiles.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([UserProfileState]), AuthModule],
  providers: [UserProfilesApi],
})
export class UserProfileModule {}
