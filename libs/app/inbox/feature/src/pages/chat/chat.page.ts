import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { httpsCallable, getFunctions } from '@angular/fire/functions';
import { Timestamp } from 'firebase-admin/firestore';
//import {ISendMessageResponse} from 'libs/api/message/util/src/responses/send-message.response'
import { AlertController } from '@ionic/angular';
import { IConversation, IMessage, IMessageMetaData, ISendMessageResponse } from '@mp/api/message/util';
import { IProfile } from '@mp/api/profiles/util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPageComponent implements OnInit {
  newMessage!: string;
  isLoading = false;
  currentUserId = 1;
  conversationID = "";
  chats:any = [];  
  /**
   *{
   *   id://id of the message.
   *   sender: who the message is from.
   *   message: // content of the message.
   *   createdAt: // Time Message was created.
   *} 
   */

  constructor(private alertController: AlertController) {}

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
    this.isLoading = true;
    const functions=getFunctions();
    const sendMsg=httpsCallable<ISendMessageResponse>(functions,'sendMessage');
    const myIMessageContent = {
      textData: this.newMessage,
      video: null,
      photo:null
    };
    const myIProfile : IProfile = {
      userId:""
    }
    const myIMessageData: IMessageMetaData = {
      timePosted : Timestamp.now(),
      sender : myIProfile
    }
    const myIMessage:IMessage = {
      id:"", //will have to get the message id
      content : myIMessageContent,
      metaData : myIMessageData
    };

    // const myConversation= {
    //     conversationID : "", ///some conversation ID.
    //     messages : myIMessage,
    //     members : [this.currentUserId, this.receiver],
    // }


    sendMsg({message:myIMessage})
      .then(() =>{
        this.newMessage =""; //CLear the input field
        this.isLoading = false; //stop the loader

        const message={
          id:this.chats.length,
          sender:this.currentUserId,
          message: myIMessage.content.textData,
          createdAt: myIMessage.metaData.timePosted
        }

        this.chats.push(message);
      })
      .catch(error => {
        console.log("SEND MESSAGE ERROR: "+error);
      })
  }

  async deleteMessage(message_id:number){
    this.chats.splice(message_id,1); //Remove the message from the list of chats.
  }
}
