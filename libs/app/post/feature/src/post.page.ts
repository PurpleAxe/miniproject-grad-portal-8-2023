import { Component } from '@angular/core';
import { Router } from '@angular/router';


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
  posts:Array<Post>=[];
  newPost:Post={};
  isLoading=false;
  error="";
  // Define the post interface
  constructor(private router: Router) {
    //
  }

  createPost(){
   if(this.newPost.body=="")
    return;
  
    console.log(this.newPost);
    this.posts.push(this.newPost);
    this.newPost={};
  }

  
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
}
