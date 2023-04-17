import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss','search.page.css'],
})
export class SearchPageComponent {
  
  segment = 'people';
  
  chatRooms = [
    { id: 1, name: 'Nikhil', photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', about: "95% of depressed people are CS students :)" },
    { id: 2, name: 'Serah', photo: 'https://i.pinimg.com/564x/a6/58/32/a65832155622ac173337874f02b218fb.jpg', about: "The aliens are coming for us!!" },
    { id: 3, name: 'Jess', photo: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_icon_159366.png', about: "God first always" }
  ];
  
  posts = [
    { id: 1, name: 'James', photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', postInfo: "95% of depressed people are CS students :)", time: "Just now" },
    { id: 2, name: 'Mark', photo: 'https://i.pinimg.com/564x/a6/58/32/a65832155622ac173337874f02b218fb.jpg', postInfo: "The aliens are coming for us!!", time: "3 hours ago" },
    { id: 3, name: 'Sabrina', photo: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_icon_159366.png', postInfo: "God first always",time: "Yesterday" }
  ];

  constructor(){}
  
  getdisplay(elem: number) {
   let tabs = ["peopleTab","groupsTab","postsTab","eventsTab"];
   for (var i=0; i<4; i++)
   {
     const tab = document.getElementById(tabs[i]);
     if (tab){
      tab.style.display = "none"
     }
   }
   const tab = document.getElementById(tabs[elem-1]);
   if (tabs[elem-1] === "postsTab"){
    this.segment = 'posts'
   }else if (tabs[elem-1] === "peopleTab"){
    this.segment = 'people'
   }
   
   if (tab){
   tab.style.display = "block";
   }
  }
}
