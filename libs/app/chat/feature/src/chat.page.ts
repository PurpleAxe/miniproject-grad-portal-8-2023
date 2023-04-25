import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {
  IConversation,
  IMessage,
  IMessageContent,
  IMessageMetaData,
} from '@mp/api/message/util';
import { InboxState, InboxStateModel } from '@mp/app/inbox/data-access';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { DeleteMessage, SendMessage, SetChat } from '@mp/app/chat/util';
import { Timestamp } from 'firebase/firestore';
import { IProfile } from '@mp/api/profiles/util';
import { AuthState } from '@mp/app/auth/data-access';
import { IUser } from '@mp/api/users/util';
import { SetcurrentConversation } from '@mp/app/inbox/util';
import { ChatState } from '@mp/app/chat/data-access';

@Component({
  // selector: 'ms-chat-page',
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  // TODO we should integrate these into the state at some point but not too bad for now
  name = '';
  newMessage!: string;
  isLoading = false;
  currentUserId = 1;
  chatRoom: any;
  @Select(InboxState.currentConversation)
  currconversation$!: Observable<IConversation | null>;
  @Select(ChatState.currentConversation)
  currconv$!: Observable<IConversation | null>;
  messageContent: IMessageContent = {
    textData: '',
    video: null,
    photo: null,
  };
  id = '';

  constructor(
    private alertController: AlertController,
    private readonly store: Store
  ) {}

  async onMessagePress(chat: IMessage) {
    const alert = await this.alertController.create({
      header: 'Delete Message',
      message: 'Are you sure you want to delete this message?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            // Perform deletion logic here
            console.log('Delete clicked');
            this.deleteMessage(chat);
          },
        },
      ],
    });
    await alert.present();
  }

  ngOnInit() {
    console.log('new chat page opened');
    this.currconversation$.subscribe((x) => {
      // console.log(
      //   x?.conversationID,
      //   ' xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxaaaaaaaaaaaaaa'
      // );
      this.chatRoom = x;
    });
    this.store.select(AuthState.user).subscribe((x: any) => (this.id = x?.uid));
    // console.log('conversation!!!!!!!!!!');
    // console.log(this.chatRoom);
    /*const convo: IConversation = {
      conversationID: string;
      members: IUser[]; // TODO remove optional for authentication purpouses
      messages: IMessage[];
      membersID: string[];
}
    }*/
    this.store.dispatch(new SetChat(this.chatRoom));
    //const myQueryParams = this.route.snapshot.queryParams;
  }

  async sendMessage() {
    if (this.newMessage?.trim() == '' || !this.newMessage) {
      //If there is a blank message or  a message that is just white space, it is not a valid message so  don't send it
      return;
    }
    this.messageContent.textData = this.newMessage;
    const member1: IProfile = {
      userId: this.id,
    };
    const now = new Date();
    const seconds = now.getTime() / 1000;
    const nanoseconds = now.getMilliseconds() * 1000000;
    const timestamp = new Timestamp(seconds, nanoseconds);

    const metadata: IMessageMetaData = {
      timePosted: timestamp,
      sender: member1,
    };
    const message: IMessage = {
      id: null,
      content: this.messageContent,
      metaData: metadata,
    };
    //this.store.dispatch(new AddMessage(this.));
    // console.log()
    this.store.dispatch(new SendMessage(message)); // TODO isloading updates
    // this.currconv$
    //   .subscribe((x) => {
    //     this.chatRoom = x;
    //   })
    //   .unsubscribe();
    setTimeout(() => {
      console.log(this.chatRoom);
    }, 1000);
  }

  async deleteMessage(message: IMessage) {
    //TODO Remove the message from the list of chats.
    this.store.dispatch(new DeleteMessage(message));
  }
}
