import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { httpsCallable, getFunctions } from '@angular/fire/functions';
import { Timestamp } from 'firebase-admin/firestore';
//import {ISendMessageResponse} from 'libs/api/message/util/src/responses/send-message.response'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPageComponent implements OnInit {
  name = 'Sender';
  receiver =  "";
  message!: string;
  isLoading = false;
  currentUserId = 1;
  conversationID = 1;
  chats = [
    { id: 1, sender: 1, message: 'hi' },
    { id: 2, sender: 2, message: 'hey' }
  ];  //some stuff need to be added/changed here. This is mock data

  // constructor() {
  // }

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
    if (this.message?.trim() == "" || !this.message) {
      //If there is a blank message or  a message that is just white space, it is not a valid message so  don't send it
      return;
    }
    this.isLoading = true;
    let responseData;
    const functions=getFunctions();
    const sendMsg=httpsCallable(functions,'sendMessage');
    const myIMessageContent = {
      textData: this.message,
      video: null,
      photo:null
    };
    const myIProfile = {
      //userID:this.currentUserId //TODO Fix this
    }
    const myIMessageData = {
      timePosted : Timestamp.now(),
      sender : myIProfile
    }
    const myIMessage = {
      id:"", //will have to get the message id
      content : myIMessageContent,
      metaData : myIMessageData
    };

    const myConversation = {
        conversationID : "", ///some conversation ID.
        messages : myIMessage,
        members : [this.currentUserId, this.receiver],
    }


    sendMsg({conversation:myConversation})
      .then(results =>{
        /**
         * Note: UI/Chat Engineer
         * Implement logic on how to load chat for both the sender and reciever
         */

        this.message = "";//this is to make the textarea where the message was entered blank
        this.isLoading = false;
        responseData = results.data;
      })
      .catch(error => {
        console.log("error occured");
        console.log(error);
      })
  }

  async deleteMessage(){
    const functions=getFunctions();
    const deleteMsg=httpsCallable(functions, 'deleteMessage');
    deleteMsg({/**some message info */})
      .then(results =>{
        /**some out put message indicating message was deleted */
      })
      .catch(error =>{
        console.log("DELETE MESSAGE ERROR: "+error);
      })
  }
}
