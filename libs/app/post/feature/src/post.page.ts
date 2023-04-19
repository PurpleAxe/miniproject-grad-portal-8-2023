import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreatePostRequestAction } from '@mp/app/post/util';
import { actionsExecuting, ActionsExecuting } from '@ngxs-labs/actions-executing';
import { Select,Store } from '@ngxs/store';
import { Observable } from 'rxjs';


interface Post {
  id?: number;
  title?: string;
  body?: string;
  department?: string;
  challenge?: string;
}



@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPageComponent {

  @Select(actionsExecuting([CreatePostRequestAction]))
  busy$!: Observable<ActionsExecuting>;

  posts:Array<Post>=[];
  newPost:Post={};
  isLoading=false;
  error="";
  
  constructor(private router: Router, private readonly store: Store) {
    //
  }

  createPost(){
   if(this.newPost.body=="")
    return;
  
    console.log(this.newPost);

    this.store.dispatch(new CreatePostRequestAction());
    this.posts.push(this.newPost);
    this.newPost={};
  }

  
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
}
