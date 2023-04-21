/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InboxState } from '@mp/app/inbox/data-access';
import {
  ActionsExecuting,
  actionsExecuting,
} from '@ngxs-labs/actions-executing';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  // @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  // @Select(actionsExecuting([UpdateAccountDetails]))
  // busy$!: Observable<ActionsExecuting>;
  constructor(
    // private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}
  @Input() item: any;
  @Output() onclick: EventEmitter<any> = new EventEmitter();
  placeholderImgUrl = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
  trasnformedItem: any;
  // constructor() // private readonly fb: FormBuilder,
  // private readonly store: Store
  // {}
  transformedItem: any;
  ngOnInit() {
    console.log(this.item, ' @@@@@@@@@@@@@@');
  }

  // redirect() {
  //   console.log('clicked redirect');
  //   this.onclick.emit(this.item);
  // }
}
