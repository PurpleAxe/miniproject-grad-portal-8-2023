/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from '@mp/api/message/util';
import { InboxState } from '@mp/app/inbox/data-access';
import {
  ActionsExecuting,
  actionsExecuting,
} from '@ngxs-labs/actions-executing';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  // @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  // @Select(actionsExecuting([UpdateAccountDetails]))
  // busy$!: Observable<ActionsExecuting>;
  constructor(
    // private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}
  @Input() chat!: IMessage;
  @Input() current_user_id!: any;
  toDateTime(secs: any) {
    const t = new Date(secs * 1000);
    // const today = new Date();
    // const yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());

    // if (t.getDate() == today.getDate())
    //   return t.toLocaleTimeString([], {
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     hour12: false,
    //   });
    // if (t.getDate() == yesterday.getDate()) return 'Yesterday';
    // if (t.getDate() < yesterday.getDate())
    return `${t.toLocaleDateString()} ${t.toLocaleTimeString()}`;

    // t.setSeconds(secs * 1000);
    // return t;
  }
  ngOnInit() {
    // console.log(this.current_user_id);
  }
}
