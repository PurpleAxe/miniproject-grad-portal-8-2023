/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from '@mp/api/message/util';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {

  @Input() chat!: IMessage;
  @Input() current_user_id!: any;

  constructor() {
    // do nothing.
  }

  ngOnInit() {
    console.log('');
  }

}

