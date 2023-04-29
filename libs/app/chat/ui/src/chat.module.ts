import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ChatBoxModule } from './chat-box';

@NgModule({
  imports: [CommonModule, IonicModule, ChatBoxModule],
  exports: [ChatBoxModule],
})
export class ChatModule {}
