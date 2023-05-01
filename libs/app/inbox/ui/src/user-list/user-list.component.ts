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
  placeholderImgUrl = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  select() {
    this.onUserPicked.emit(this.item);
  }
}
