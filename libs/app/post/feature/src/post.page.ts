import { Component } from '@angular/core';


interface Post {
  id?: number;
  title?: string;
  body?: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPageComponent {
  posts:Array<Post>=[];
  newPost: Post={};
  isLoading=false;
  error="";
  // Define the post interface
  constructor(){
    this.generate();
  }
  
  generate(){
    for(let i=0;i<5;i++){
      this.posts[i]={
        id:i,
        title: "POST TITLE"+i,
        body: "Post body here....Post body here...Post body here..."
      }
    }
  }

  createPost(){
    //
    this.newPost.id=this.posts.length;
    this.posts.push(this.newPost);
    this.newPost.title="";
    this.newPost.body="";
  }
}




