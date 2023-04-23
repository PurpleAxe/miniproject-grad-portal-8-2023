import { Component, Input } from '@angular/core';
import { LikePost} from '@mp/app/feed/util';
import { DislikePost} from '@mp/app/feed/util';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() content!: any;
  constructor(private router: Router, private readonly store: Store) { }

  postId = "POST ID"; //would I store the postId here so I know what post was liked?

  likeNum = 0;
  dislikeNum = 0;
  isLiked = false;
  isDisliked = false;

  commentNum = 0;

  Like(){
    if (this.isDisliked){
      //remove dislike
      const payload={
        postId: this.postId,
      }
      this.store.dispatch(new LikePost(payload));
      this.isDisliked = !this.isDisliked;
      this.dislikeNum--;
    }
    if (this.isLiked){
      this.isLiked = !this.isLiked;
      this.likeNum--;
      return;
    }
    this.isLiked = !this.isLiked;
    this.likeNum++;
    //add like
    const payload={
      postId: this.postId,
    }
    this.store.dispatch(new DislikePost(payload));
    console.log("Like button: " + this.likeNum);

  }
  Dislike(){
    if (this.isLiked){
      //remove like
      const payload={
        postId: this.postId,
      }
      this.store.dispatch(new LikePost(payload));
      this.isLiked = !this.isLiked;
      this.likeNum--;
    }
    if (this.isDisliked){
      this.isDisliked = !this.isDisliked;
      this.dislikeNum--;
      return;
    }
    this.isDisliked = !this.isDisliked;
    this.dislikeNum++;
    //add dislike
    const payload={
      postId: this.postId,
    }
    this.store.dispatch(new DislikePost(payload));
    console.log("Dislike button: " + this.likeNum);
  }
  Comment(){
    console.log("Comment button");
  }
  Share(){
    console.log("Share button");
  }
}
