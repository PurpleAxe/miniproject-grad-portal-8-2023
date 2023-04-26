import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { FeedApi } from './feed.api';
import { FeedState } from './feed.state';

@NgModule({
  imports: [CommonModule, AuthModule, NgxsModule.forFeature([FeedState])],
  providers: [FeedApi],
})
export class FeedModule {}
