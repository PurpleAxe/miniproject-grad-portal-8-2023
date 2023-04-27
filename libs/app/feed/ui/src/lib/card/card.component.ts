import { Component, Input } from '@angular/core';
import { LikePost} from '@mp/app/feed/util';
import { DislikePost} from '@mp/app/feed/util';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';


import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  profile!:IProfile;
  @Input() content!: any;
  @Input() text!: string;
  @Input() profileUrl!:string;
  @Input() date!:string;
  @Input() userName!:string;
  @Input() challenge!:string;
  @Input() department!:string;

  constructor(private router: Router, private readonly store: Store) { }

  @Input() postId!: string;
  @Input() userId!: string;

  @Input() likeNum = 0;
  @Input() dislikeNum = 0;
  isLiked = false;
  isDisliked = false;

  commentNum = 0;

  Like(){
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if(profile){
        this.profile = profile;
        const payload={
          postId: this.postId,
          userId: this.profile.userId
        }
        if (this.isDisliked){
          //remove dislike
          this.store.dispatch(new DislikePost(payload));
          this.isDisliked = !this.isDisliked;
          this.dislikeNum--;
        }
        this.isLiked = !this.isLiked;
        if (this.isLiked){
          this.likeNum--;
        }
        else {
          this.likeNum++;
        }

        //add like
    
        this.store.dispatch(new LikePost(payload));
        console.log("Like button: " + this.likeNum);
    
      }
    });
    
  }
  Dislike(){
    this.store.dispatch(new SubscribeToProfile());
    this.profile$.subscribe((profile) => {
      if(profile){
      this.profile = profile;
      const payload={
        postId: this.postId,
        userId: this.profile.userId
      }
      if (this.isLiked){
        //remove like

        this.store.dispatch(new LikePost(payload));
        this.isLiked = !this.isLiked;
        this.likeNum--;
      }
      this.isDisliked = !this.isDisliked;
      if (this.isDisliked){
        this.dislikeNum--;
      }
      else {
        this.dislikeNum++;
      }

      //add dislike

      this.store.dispatch(new DislikePost(payload));
      console.log("Dislike button: " + this.likeNum);
      
    }
  });
}
  Comment(){
    console.log("Comment button");
  }
  Share(){
    console.log("Share button");
  }
}
