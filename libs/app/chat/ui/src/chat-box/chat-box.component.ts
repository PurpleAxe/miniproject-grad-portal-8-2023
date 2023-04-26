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

  ngOnInit() {
    // console.log(this.current_user_id);
  }
}
