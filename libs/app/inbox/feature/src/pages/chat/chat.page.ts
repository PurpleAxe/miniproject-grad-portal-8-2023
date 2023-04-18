import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { httpsCallable, getFunctions } from '@angular/fire/functions';
import { Timestamp } from '@angular/fire/firestore';
//import {ISendMessageResponse} from 'libs/api/message/util/src/responses/send-message.response'
import { AlertController } from '@ionic/angular';
import { IConversation, IMessage, IMessageMetaData, ISendMessageResponse } from '@mp/api/message/util';
import { IProfile } from '@mp/api/profiles/util';
import { InboxState } from '@mp/app/inbox/data-access';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {SendMessage} from '@mp/app/inbox/util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPageComponent implements OnInit {
  // TODO we should integrate these into the state at some point but not too bad for now
  name="";
  newMessage!: string;
  isLoading = false;
  currentUserId = 1;
  @Select(InboxState.conversation) conversation$!: Observable<IConversation | null>;  

  /**
   *{
   *   id://id of the message.
   *   sender: who the message is from.
   *   message: // content of the message.
   *   createdAt: // Time Message was created.
   *}
   */

  constructor(
    private alertController: AlertController,
    private readonly store: Store
  ) {}

  async onMessagePress(chat: any) {
    const alert = await this.alertController.create({
      header: 'Delete Message',
      message: 'Are you sure you want to delete this message?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            // Perform deletion logic here
            console.log('Delete clicked');
          }
        }
      ]
    });

  await alert.present();
}

  ngOnInit() {
    console.log('');
    //const myQueryParams = this.route.snapshot.queryParams;


  }

  async sendMessage() {
    if (this.newMessage?.trim() == "" || !this.newMessage) {
      //If there is a blank message or  a message that is just white space, it is not a valid message so  don't send it
      return;
    }
    this.store.dispatch(new SendMessage()); // TODO isloading updates
  }

  async deleteMessage(message_id:number){
    //TODO Remove the message from the list of chats.
  }
}
