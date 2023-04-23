import { Component, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() content!: any;

  likeNum = 0;
  dislikeNum = 0;
  isLiked = false;
  isDisliked = false;

  commentNum = 0;

  Like(){
    if (this.isDisliked){
      this.isDisliked = !this.isDisliked;
      this.dislikeNum--;
    }
    if (this.likeNum > 0){
      return;
    }
    this.isLiked = !this.isLiked;
    this.likeNum++;
    console.log("Like button" + this.likeNum);

  }
  Dislike(){
    if (this.isLiked){
      this.isLiked = !this.isLiked;
      this.likeNum--;
    }
    if (this.dislikeNum > 0){
      return;
    }
    this.isDisliked = !this.isDisliked;
    this.dislikeNum++;
    console.log("Dislike button" + this.likeNum);
  }
  Comment(){
    console.log("Comment button");
  }
  Share(){
    console.log("Share button");
  }
}
