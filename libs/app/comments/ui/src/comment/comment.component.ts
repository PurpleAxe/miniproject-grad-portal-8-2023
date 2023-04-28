import { Component, Input } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {

  @Input() profileUrl!:string;//"https://ionicframework.com/docs/demos/api/avatar/avatar.svg";
  @Input() userId!:string;
  @Input() comment!:string;
  @Input() date!:string;
  @Input() commentId!:string;

  /**
   * [userId]="c.userID"
      [profileURl]="getProfileUrl(userId)"
      [comment]="c.text"
      [date]="c.timestamp"
      [commentId]="c.commentID">
   */
}