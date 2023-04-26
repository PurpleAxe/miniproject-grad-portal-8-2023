import { Component, Input } from '@angular/core';
import { LikePost, fetchComments} from '@mp/app/feed/util';
import { DislikePost} from '@mp/app/feed/util';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() content!: any;
  @Input() text!: string;
  @Input() profileUrl!:string;
  @Input() date!:string;
  @Input() userName!:string;
  @Input() likeNum = 0;
  @Input() dislikeNum = 0;
  // @Input() postId = "POST ID"; //would I store the postId here so I know what post was liked?
  // userId = "USER ID";
  @Input() challenge!:string;
  @Input() department!:string;
  @Input() postId!: string;
  @Input() userId!: string;

  constructor(private router: Router, private readonly store: Store) { }
 
  
  isLiked = false;
  isDisliked = false;
  commentNum = 0;

  Like(){
    const payload={
      postId: this.postId,
      userId: this.userId
    }
    if (this.isDisliked){
      //remove dislike
      this.store.dispatch(new DislikePost(payload));
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

    this.store.dispatch(new LikePost(payload));
    console.log("Like button: " + this.likeNum);

  }
  Dislike(){
    const payload={
      postId: this.postId,
      userId: this.userId
    }
    if (this.isLiked){
      //remove like

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

    this.store.dispatch(new DislikePost(payload));
    console.log("Dislike button: " + this.likeNum);
  }
  Comment(){
    console.log("Comment button");
    this.store.dispatch(new fetchComments({postId:this.postId,ownerId:this.userName}));
    this.router.navigate(["/home/comment"]);
  }
  Share(){
    console.log("Share button");
  }

  
}
