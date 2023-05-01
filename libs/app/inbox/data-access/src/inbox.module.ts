import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { InboxState } from './inbox.state';
import { InboxApi } from './inbox.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([InboxState]), AuthModule],
  providers: [InboxApi],
})
export class InboxModule {}