import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss','search.page.css'],
})
export class SearchPageComponent { 
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
