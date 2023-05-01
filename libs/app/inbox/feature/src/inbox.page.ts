/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { InboxState, InboxStateModel } from '@mp/app/inbox/data-access';
import {
  CreateConversation,
  GetUserId,
  GetUsers,
  Logout,
  SetcurrentConversation,
  SubscribeToInbox,
} from '@mp/app/inbox/util';
import { Observable, tap, map, Timestamp } from 'rxjs';
import { AuthState } from '@mp/app/auth/data-access';
import { IUser } from '@mp/api/users/util';
import { ProfileState } from '@mp/app/profile/data-access';

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
  placeholderImgUrl = 'https://ionicframework.com/docs/img/demos/avatar.svg';
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

  ngOnInit() {
    console.log('initializing inbox');
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
    this.store.select(InboxState.conversations).subscribe((x) => {
      this.conversations = x;
    });
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

  async newChatModalOpen() {
    await this.getUsers();
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
    const conversation = this.store
      .select(InboxState.conversations)
      .subscribe((x) => {
        if (x) {
          this.chatRooms = x;
        }
      });
    let noConversation = true;
    if (this.chatRooms) {
      for (let i = 0; i < this.chatRooms.length; i++) {
        if (
          item.id == this.chatRooms[i].membersID[0] ||
          item.id == this.chatRooms[i].membersID[1]
        ) {
          this.chatRoom = this.chatRooms[i];
          noConversation = false;
          break;
        }
      }
      this.store.dispatch(new SetcurrentConversation(this.chatRoom));
    }
    if (!noConversation) {
      console.log(this.chatRoom, 'chatttttttttttroom');
      if (this.chatRoom && this.chatRoom.conversationID) {
        this.router.navigate([
          '/',
          'home',
          'inbox',
          'chats',
          this.chatRoom.conversationID,
        ]);
      }
      conversation.unsubscribe();
      this.cancel();
    }
    if (noConversation) {
      this.chatRoom = null;
      let displayName = '';
      let photoURL = '';
      this.store
        .select(AuthState.user)
        .subscribe((x: any) => {
          // console.log(x, 'gggggggggggggggggggggggggxx');
          this.user = x?.uid;
          this.email = x?.email;
          displayName = x?.displayName;
          photoURL = x?.photoURL;
        })
        .unsubscribe();
      this.store
        .select(ProfileState.profile)
        .subscribe((x: any) => {
          // console.log(x, 'gggggggggggggggggggggggggxx');
          this.user = x?.userId;
          this.email = x?.accountDetails.email;
          displayName = x?.accountDetails.displayName;
          photoURL = x?.accountDetails.photoURL;
        })
        .unsubscribe();

      const member1: IUser = {
        id: this.user,
        email: this.email,
        displayName: displayName,
        photoURL: photoURL ? photoURL : '',
        phoneNumber: '',
        customClaims: null,
        created: null,
      };
      // console.log(member1, 'member1 ddddddddddzzzzzzzzzzzzzzzzzzz');

      this.member2.id = item.id;
      this.member2.email = item.email;
      this.member2.displayName = item.displayName;
      this.member2.photoURL = item.photoURL ? item.photoURL : '';
      this.member2.phoneNumber = item.phoneNumber;
      this.member2.customClaims = item.customClaims;
      this.member2.created = null;

      member1.id = this.user;
      this.store.dispatch(new CreateConversation([member1, this.member2]));
      this.store.select(InboxState.currentConversation).subscribe((x) => {
        this.chatRoom = x;
        console.log(this.chatRoom, 'in no convo chatttttttttttroom');

        if (this.chatRoom && this.chatRoom.conversationID) {
          this.router.navigate([
            '/',
            'home',
            'inbox',
            'chats',
            this.chatRoom.conversationID,
          ]);
        }
        conversation.unsubscribe();
        this.cancel();
      });
      // .unsubscribe();
    }
    // console.log(this.chatRoom, ' this.chatroom');
    // this.store.dispatch(new SetcurrentConversation(this.chatRoom));
  }

  getChat(item: any) {
    this.chatRoom = item;
    this.store.dispatch(new SetcurrentConversation(this.chatRoom));
    this.router.navigate([
      '/',
      'home',
      'inbox',
      'chats',
      this.chatRoom.conversationID,
    ]);
    this.cancel();
  }
  toDateTime(secs: any) {
    const t = new Date(secs * 1000);
    const today = new Date();
    const yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());

    if (t.getDate() == today.getDate())
      return t.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    if (t.getDate() == yesterday.getDate()) return 'Yesterday';
    if (t.getDate() < yesterday.getDate()) return t.toDateString();

    return t;
  }
}
