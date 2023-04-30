import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IComment } from '@mp/api/comments/util';
import { FeedState } from '@mp/app/feed/data-access';
import { sendComment } from '@mp/app/feed/util';
import { Select, Store } from '@ngxs/store';
import { Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {AuthState} from '@mp/app/auth/data-access';



@Component({
  selector: 'mp-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  constructor(private readonly store: Store,private router: Router) {this.displayComments()}
  @Select(FeedState.getComments) comment$! :Observable<IComment[]>;
  @Select(FeedState.getPostsInfo) postInfo$! :Observable<{postId:string, ownerId:string}>;
  userId! :string;

  async getUserId() {
      this.store
        .select(AuthState.user)
        .subscribe((x: any) => (this.userId = x?.uid));
  }
  comments:IComment[]=[];
  postId!:string;
  ownerId!:string;
  senderId="";
  text='';

  ngOnInit() {
    this.getUserId()
    this.displayComments()
  }

  displayComments (){
    this.comment$.subscribe((res:IComment[])=>{
      this.comments=res;
    })
  }

  getPostInfo(){
    this.postInfo$.subscribe((res:any)=>{
      this.postId=res.postId;
      this.ownerId=res.ownerId;
    });

    this.senderId=this.userId;
    // console.log(this.senderId);
  }

  sendComment(){
    if(!/\S/.test(this.text))
      return;
      const now=new Date();
      const seconds = now.getTime()/1000;
      const nonoseconds = now.getMilliseconds() * 1000000;
      const timestamp = new Timestamp(seconds, nonoseconds);
      this.getPostInfo();

      const payload={
        postId:this.postId,
        senderId:this.senderId,
        text:this.text,
        commentId:"",
        ownerId:this.ownerId,
        timestamp:timestamp
      }
     this.store.dispatch(new sendComment(payload));
      this.text='';
     this.displayComments();

  }

  getProfileUrl(userId:string){
    return "https://ionicframework.com/docs/demos/api/avatar/avatar.svg";
  }

  goToFeed(){
    this.router.navigate(["/home/feed"]);
  }

  formatDateFromNanoseconds(seconds: number, nanoseconds: number): string {
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
