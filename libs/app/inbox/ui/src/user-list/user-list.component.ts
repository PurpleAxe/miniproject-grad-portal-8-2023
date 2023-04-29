import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  // constructor() {}
  @Input() item: any;
  @Output() onUserPicked: EventEmitter<any> = new EventEmitter();
  placeholderImgUrl = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  select() {
    this.onUserPicked.emit(this.item);
  }
}
