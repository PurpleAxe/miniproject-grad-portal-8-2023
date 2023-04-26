import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IComment } from '@mp/api/post/util';
import { FeedState } from '@mp/app/feed/data-access';
import { sendComment } from '@mp/app/feed/util';
import { Select, Store } from '@ngxs/store';
import { Timestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'mp-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  constructor(private readonly store: Store,private router: Router) {this.displayComments()}
  @Select(FeedState.getComments) comment$! :Observable<IComment[]>;
  @Select(FeedState.getPostsInfo) postInfo$! :Observable<{postId:string, ownerId:string}>;
  @Select(FeedState.getUserId) userId$! :Observable<string>;
  comments:IComment[]=[];
  postId!:string;
  ownerId!:string;
  senderId="Testing";
  text=''
  comments$=[1,2,3,4,5,6];

  ngOnInit() {this.displayComments()}

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

    // this.userId$.subscribe((res:any)=>{
    //   this.senderId=res.userId;
    // })
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
}
