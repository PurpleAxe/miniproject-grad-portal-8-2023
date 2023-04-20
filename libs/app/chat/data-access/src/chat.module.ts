import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { ChatState } from './chat.state';
import { InboxApi } from '@mp/app/inbox/data-access';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ChatState]), AuthModule],
  providers: [InboxApi],
})
export class ChatModule {}
