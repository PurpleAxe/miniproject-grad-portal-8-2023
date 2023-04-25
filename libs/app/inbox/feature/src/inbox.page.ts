/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { InboxState, InboxStateModel } from '@mp/app/inbox/data-access';
import {
  CreateConversation,
  GetConversation,
  GetUserId,
  GetUsers,
  Logout,
  SetcurrentConversation,
  SubscribeToInbox,
} from '@mp/app/inbox/util';
import { IConversation } from '@mp/api/message/util';
import { Observable, tap, map, Timestamp } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthState } from '@mp/app/auth/data-access';
import { getCurrentUserId } from '@mp/app/auth/util';
import { IUser } from '@mp/api/users/util';
import { isUidIdentifier } from 'firebase-admin/lib/auth/identifier';
import { Console } from 'console';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPageComponent implements OnInit {
  @Select(InboxState.conversations)
  inboxconversations$!: Observable<InboxStateModel | null>;
  @Select(InboxState.currentConversation)
  currentConversation$!: Observable<InboxStateModel | null>;
  @Select(InboxState.members)
  inboxmembers$!: Observable<InboxStateModel | null>;
  @ViewChild('new_chat') modal!: ModalController;
  @ViewChild('popover') popover!: PopoverController;

  segment = 'chats';
  open_new_chat = false;
  user: any;
  email: any;
  userNew$: any;
  placeholderImgUrl = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
  //userId: string;
  /*users = [
    {
      id: 1,
      name: 'Nikhil',
      photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    {
      id: 2,
      name: 'Serah',
      photo:
        'https://i.pinimg.com/564x/a6/58/32/a65832155622ac173337874f02b218fb.jpg',
    },
    {
      id: 3,
      name: 'Jess',
      photo:
        'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_icon_159366.png',
    },
  ];

  chatRooms = [
    {
      id: 1,
      name: 'Nikhil',
      photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    {
      id: 2,
      name: 'Serah',
      photo:
        'https://i.pinimg.com/564x/a6/58/32/a65832155622ac173337874f02b218fb.jpg',
    },
    {
      id: 3,
      name: 'Jess',
      photo:
        'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_icon_159366.png',
    },
  ];*/
  users: any;
  conversations: any;
  userSubscribtion: any;
  conversationSubscribtion: any;

  chatRoomstub: any;
  chatRoom: any;
  chatRooms: {
    conversationId: string;
    members: string[];
    messages: string[];
    membersID: string[];
  }[] = [];

  member2: IUser = {
    id: '',
    email: '',
    displayName: '',
    photoURL: '',
    phoneNumber: '',
    customClaims: null,
    created: null,
  };

  constructor(private router: Router, private readonly store: Store) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    console.log('initializing');
    this.getUsers();
    this.getConversation();
  }
  getUsers() {
    this.store.dispatch(new GetUsers());
    this.userSubscribtion = this.store
      .select(InboxState.users)
      .subscribe((x) => {
        this.users = x;
      });
  }
  getConversation() {
    this.setUserId();
    this.store.dispatch(new SubscribeToInbox());
    // this.conversationSubscribtion = this.store
    // .select(InboxState.conversations)
    // .subscribe((x) => {
    //   // console.log(x, 'ssssssssssssssssssssss');
    //   // this.conversations = x;
    // });
    // this.conversationSubscribtion.unsubscribe();
    this.store.select(InboxState.conversations).subscribe((x) => {
      this.conversations = x;
    });
    // this.conversations
  }
  setUserId() {
    this.store.dispatch(new GetUserId());
  }

  OnDestroy() {
    console.log('onDestroy called : inbox.page.ts');
    this.userSubscribtion.unsubscribe();
    this.conversationSubscribtion.unsubscribe();
  }

  logout() {
    this.popover.dismiss();
    this.store.dispatch(new Logout());
  }

  onSegmentChanged(event: any) {
    //
  }

  newChatModalOpen() {
    this.open_new_chat = true;
  }

  onWillDismiss(event: any) {
    //
  }

  cancel() {
    this.modal.dismiss();
    this.open_new_chat = false;
  }

  startChat(item: IUser) {
    console.log('user clicked ;)');
    console.log(item);
    // this.store.dispatch(new GetConversation());
    const conversation = this.store
      .select(InboxState.conversations)
      .subscribe((x) => {
        if (x) {
          this.chatRooms = x;
        }
        console.log('define chatRooms');
      });
    console.log('should print conversations app user is in');
    //console.log(this.chatRooms.map((room) => room.participants));
    console.log(this.chatRooms);
    let noConversation = true;
    for (let i = 0; i < this.chatRooms.length; i++) {
      if (
        item.id == this.chatRooms[i].membersID[0] ||
        item.id == this.chatRooms[i].membersID[1]
      ) {
        this.chatRoom = this.chatRooms[i];
        noConversation = false;
        console.log("found the conversation!!!!!!!!!!!!!!");
        break;
      }
    }
    if (noConversation) {
      this.chatRoom = null;
      let displayName = '';
      let photoURL = '';
      this.store
        .select(AuthState.user)
        .subscribe(
          (x: any) => (
            (this.user = x?.uid),
            (this.email = x?.email),
            (displayName = x?.displayName),
            (photoURL = x?.photoURL)
          )
        );
      //get members action
      //
      //create a new chatroom to store to firebase
      const member1: IUser = {
        id: this.user,
        email: this.email,
        displayName: displayName,
        photoURL: photoURL,
        phoneNumber: '',
        customClaims: null,
        created: null,
      };

      this.member2.id = item.id;
      this.member2.email = item.email;
      this.member2.displayName = item.displayName;
      this.member2.photoURL = item.photoURL;
      this.member2.phoneNumber = item.phoneNumber;
      this.member2.customClaims = item.customClaims;
      this.member2.created = null;

      member1.id = this.user;
      console.log('give me two users');
      //console.log([this.member2,member1]);

      this.store.dispatch(new CreateConversation([member1, this.member2]));
      const newConversation = this.store
        .select(InboxState.currentConversation)
        .subscribe((x) => {
          this.chatRoom = x;
        });
    }
    console.log(
      'should print conversation clicked user and current user is in'
    );
    console.log(this.chatRoom);
    this.store.dispatch(new SetcurrentConversation(this.chatRoom));
    this.router.navigate(['/', 'home' , 'inbox' , 'chats', this.chatRoom.conversationID]);
    this.cancel();
    /*this.store.select(InboxState.currentConversation).subscribe((x) => {
      console.log("should print current conversation");
      console.log(x);
    });*/
    /*this.store.dispatch(new CreateConversation())
    const conversations = this.store.select(InboxState.conversation).subscribe((x) => {
      if (x) {
        this.chatRooms.push({ id1: x[0].members.id; id2:  ; name:  ; photo: null });
      }
      
    });*/
    /*if (this.chatRooms) {
      for (let i = 0; i < this.chatRooms.length; i++) {
        if (this.chatRooms[i]) {
          
        }
        
      }
    }*/

    //this.router.navigate(['/chats']);
    console.log(item); // has selected user {id: , displayName: , photoURL}
    //1. TODO list all users
  }

  getChat(item: any) {
    this.chatRoom=item;
    this.store.dispatch(new SetcurrentConversation(this.chatRoom));
    this.router.navigate(['/', 'home' , 'inbox' , 'chats', this.chatRoom.conversationID]);
    this.cancel();
    //this.router.navigate(['/', 'inbox', 'chats', item?.id]);
    //TODO make the conversation the current conversation and display all prev texts
    // this.router.navigate(['/home/inbox']);
  }
}
