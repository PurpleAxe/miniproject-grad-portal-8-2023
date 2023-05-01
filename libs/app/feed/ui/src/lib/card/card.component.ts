import { Component, Input } from '@angular/core';
import { LikePost, fetchComments} from '@mp/app/feed/util';
import { DislikePost} from '@mp/app/feed/util';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';


import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { SubscribeToProfile } from '@mp/app/profile/util';
import {AuthState} from '@mp/app/auth/data-access';
import {DocumentReference, DocumentSnapshot, onSnapshot} from '@angular/fire/firestore';
import {IPost} from '@mp/api/post/util';
import {IComment} from '@mp/api/comments/util';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;
  profile!:IProfile;
  content!: any;
  text!: string;
  profileUrl!:string;
  date!:string;
  userName!:string;
  likeNum = 0;
  dislikeNum = 0;
  commentNum = 0;
  // @Input() postId = "POST ID"; //would I store the postId here so I know what post was liked?
  // userId = "USER ID";
  @Input() data!:DocumentReference;
  challenge!:string;
  department!:string;
  postId!: string;
  userId!: string;
  comments!: IComment[]|null|undefined;

  constructor(private router: Router, private readonly store: Store) { }


  @Input() isLiked!:boolean;
  @Input() isDisliked!:boolean;

  private userID: any;
  formatDateFromNanoseconds(seconds: number, nanoseconds: number): string {
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  ngOnInit() {
    onSnapshot(this.data, (docSnapshot) => {
      const docData:IPost = docSnapshot.data() as IPost;
      this.userName = docData.userName!;
      this.postId = docData.postId!;
      this.text = docData.message!;
      this.profileUrl = "https://ionicframework.com/docs/img/demos/avatar.svg";
      this.date = docData.created ? this.formatDateFromNanoseconds(docData.created.seconds, docData.created.nanoseconds) : ''
      this.department = docData.department!
      this.challenge = docData.challenge!
      this.likeNum = docData.likes!
      this.dislikeNum = docData.dislikes!
      this.commentNum = docData.comments!.length
      this.comments = docData.comments
    })
  }
  async getUserId() {
      this.store
        .select(AuthState.user)
        .subscribe((x: any) => (this.userID = x?.uid));
  }

  Like(){
    this.getUserId()
    const payload={
      postId: this.postId,
      postUserID: this.userId,
      userId: this.userID
    }
    if (this.isLiked){
      this.likeNum--;
    }
    else {
      this.likeNum++;
    }
    this.isLiked = !this.isLiked;

    if (this.isDisliked){
      //remove dislike
      this.store.dispatch(new DislikePost(payload));
      this.isDisliked = !this.isDisliked;
      this.dislikeNum--;
    }
    //add like
    this.store.dispatch(new LikePost(payload));
    console.log("Like button: " + this.likeNum);
    console.log(payload);
  }

  Dislike(){
    this.getUserId()
    const payload={
      postId: this.postId,
      postUserID: this.userId,
      userId: this.userID
    }
    if (this.isDisliked){
      this.dislikeNum--;
    }
    else {
      this.dislikeNum++;
    }

    if (this.isLiked){
      //remove like

      this.store.dispatch(new LikePost(payload));
      this.isLiked = !this.isLiked;
      this.likeNum--;
    }
    this.isDisliked = !this.isDisliked;

    //add dislike

    this.store.dispatch(new DislikePost(payload));
    console.log("Dislike button: " + this.likeNum);
    console.log("Payload: " + payload);
}

  Comment(){
    console.log("Comment button");
    this.store.dispatch(new fetchComments({postId:this.postId,ownerId:this.userName,comments:this.comments}));
    this.router.navigate(["/home/comment"]);
  }
  Share(){
    console.log("Share button");
  }


}
