import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { PostState } from './post.state';
// import { ProfileState } from './profile.state';
// import { ProfilesApi } from './profiles.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([PostState]), AuthModule],
  providers: [/*ProfilesApi*/],
})
export class PostModule {}