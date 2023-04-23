/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { InboxState, InboxStateModel } from '@mp/app/inbox/data-access';
import { CreateConversation, GetConversation, GetUserId, GetUsers, Logout, SubscribeToInbox } from '@mp/app/inbox/util';
import { IConversation } from '@mp/api/message/util';
import { Observable, tap, map, Timestamp } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthState } from '@mp/app/auth/data-access';
import { getCurrentUserId } from '@mp/app/auth/util';
import { IUser } from '@mp/api/users/util';
import { isUidIdentifier } from 'firebase-admin/lib/auth/identifier';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPageComponent implements OnInit {
  @Select(InboxState.conversations) inboxconversations$!: Observable<InboxStateModel | null>;
  @Select(InboxState.members) inboxmembers$!: Observable<InboxStateModel | null>;
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
  chatRoomstub: any;
  chatRoom: any;
  chatRooms: { conversationId: string; messages: string[]; participants: string[] }[] = [];

  member2: IUser = {
    id: '',
    email: '',
    displayName: '',
    photoURL: '',
    phoneNumber: '',
    customClaims: null,
    created: null
  };

  constructor(private router: Router, private readonly store: Store) {
    
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.setUserId();
    
    this.store.dispatch(new SubscribeToInbox());
    console.log("inbox should be printed after this");
    console.log(this.inboxconversations$);
    console.log(typeof(this.inboxconversations$));
    console.log(this.inboxconversations$);
    //console.log(this.user);
  }

  // ngOnDestroy() {
  //   // this.userList.unsubscribe();
  // }

  logout() {
    this.popover.dismiss();
    this.store.dispatch(new Logout());
  }

  onSegmentChanged(event: any) {
    //
  }

  setUserId() {
    this.store.dispatch(new GetUserId());
  }

  newChatModalOpen() {
    this.open_new_chat = true;
    this.users = [];
    this.store.dispatch(new GetUsers());
    const users = this.store.select(InboxState.users).subscribe((x) => {
      this.users = x;
    });
    console.log(this.users);
    users.unsubscribe();
    // this.users = users;
    // setTimeout(() => {
    //   this.store
    //     .select(InboxState.users)
    //     .subscribe((x) => console.log(x, 'zzzzzzzzzzzzzzz'));
    //   console.log('dd');
    //   // if (users) users.subscribe((x) => console.log(x, 'zzzzzzzzzzzzzzz'));

    //   /*if (this.inboxconversations$) {
    //     console.log("new user");
    //     console.log(inboxState.users);
    //     for (let i = 0; i < inboxState.users?.length; i++) {
    //       this.users.push({ id: i , name: inboxState.users[i] , photo: ""});
    //     }
    //   }*/
    // }, 2000);

    // console.log(this.store.dispatch(new GetUserId()), '$##@#@#@#@#');
    // this.userList.pipe(tap((x) => console.log(x)));
    // }
    /*console.log(this.userNew$);
    this.userNew$.subscribe((x: any) => console.log(x), 'zzzzzzzzzzz');
    console.log('done fetching users');*/
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
    this.store.dispatch(new GetConversation());
    const conversation = this.store.select(InboxState.conversation).subscribe((x) => {
      if (x) {
        this.chatRooms=x;
      }
      console.log("define chatRooms");
    });
    console.log("should print conversations app user is in");
    console.log(this.chatRooms.map(room => room.participants));
    let noConversation=true;
    for (let i = 0; i < this.chatRooms.length; i++) {
      if (item.id==this.chatRooms[i].participants[0]||item.id==this.chatRooms[i].participants[1]) {
        this.chatRoom=this.chatRooms[i];
        noConversation=false;
        break;
      }
    }
    if (noConversation) {
      this.chatRoom=null;
      this.store.select(AuthState.user).subscribe((x: any) => (
        this.user = x?.uid,
        this.email = x?.email
      ));
      //get members action
      //
      //create a new chatroom to store to firebase
      const member1: IUser = {
        id: this.user,
        email: this.email,
        displayName: '',
        photoURL: '',
        phoneNumber: '',
        customClaims: null,
        created: null
      };

      this.member2.id=item.id;
      this.member2.email=item.email;
      this.member2.displayName=item.displayName;
      this.member2.photoURL=item.photoURL;
      this.member2.phoneNumber=item.phoneNumber;
      this.member2.customClaims=item.customClaims;
      this.member2.created=item.created;

      member1.id=this.user; 
      console.log("give me two users");
      //console.log([this.member2,member1]);

      this.store.dispatch(new CreateConversation([member1,this.member2]));
      const newConversation = this.store.select(InboxState.currentConversation).subscribe((x) => {
        this.chatRoom = x;
      });
    }
    console.log("should print conversation clicked user and current user is in");
    console.log(this.chatRoom);
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
    this.router.navigate(['/', 'inbox', 'chats', item?.id]);
    //TODO make the conversation the current conversation and display all prev texts
    // this.router.navigate(['/home/inbox']);
  }
}
