import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ChatModule as ChatUiModule } from '@mp/app/chat/ui';
import { ChatModule as ChatDataAccessModule } from '@mp/app/chat/data-access';
import { ChatPage } from './chat.page';
import { ChatRouting } from './chat.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ChatRouting,
    ChatDataAccessModule,
    ChatUiModule,
    FormsModule,
  ],
  declarations: [ChatPage],
})
export class ChatModule {}
