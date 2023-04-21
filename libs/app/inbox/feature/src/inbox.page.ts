/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { InboxState } from '@mp/app/inbox/data-access';
import { GetUserId, GetUsers } from '@mp/app/inbox/util';
import { IConversation } from '@mp/api/message/util';
import { Observable, tap } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthState } from '@mp/app/auth/data-access';
import { getCurrentUserId } from '@mp/app/auth/util';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPageComponent implements OnInit {
  @Select(InboxState.conversation) inbox$!: Observable<IConversation | null>;

  @ViewChild('new_chat') modal!: ModalController;
  @ViewChild('popover') popover!: PopoverController;

  segment = 'chats';
  open_new_chat = false;
  user: any;
  userNew$: any;
  placeholderImgUrl = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  users = [
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
  ];

  constructor(private router: Router, private readonly store: Store) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    // console.log('');
    //TODO get all previous conversations on a list and display
  }
  // ngOnDestroy() {
  //   // this.userList.unsubscribe();
  // }

  logout() {
    this.popover.dismiss();
  }

  onSegmentChanged(event: any) {
    //
  }

  newChatModalOpen() {
    this.open_new_chat = true;
    // if (!this.userList) {

    // =this.store
    //   .select(AuthState.user)
    //   .subscribe((x) => console.log(x.uid, 'zzzzzzzzz'));
    // let userId;
    // const uid = this.store.select(AuthState.user).subscribe((x) => {
    // console.log(x.uid);
    // });
    // console.log(userId.uid, 'lllllllllllllllllll');
    // this.store.pipe()

    this.userNew$ = this.store.dispatch(new GetUsers());
    // console.log(this.store.dispatch(new GetUserId()), '$##@#@#@#@#');
    // this.userList.pipe(tap((x) => console.log(x)));
    // }
    console.log(this.userNew$);
    this.userNew$.subscribe((x: any) => console.log(x), 'zzzzzzzzzzz');
    console.log('done fetching users');
  }

  onWillDismiss(event: any) {
    //
  }

  cancel() {
    this.modal.dismiss();
    this.open_new_chat = false;
  }

  startChat(item: any) {
    //1. TODO list all users
    console.log('clicked startChat from inbox.page.ts');
  }

  getChat(item: any) {
    this.router.navigate(['/', 'inbox', 'chats', item?.id]);
    //TODO make the conversation the current conversation and display all prev texts
    // this.router.navigate(['/home/inbox']);
  }
}
