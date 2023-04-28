// import { Component, OnInit } from '@angular/core';
// import { Select, Store } from '@ngxs/store';
// import { FormBuilder } from '@angular/forms';
// import { SearchTest } from '@mp/app/search-test/util';
// import { ISearch } from '@mp/api/search/util';
// import { actionsExecuting } from '@ngxs-labs/actions-executing';

// @Component({
//   selector: 'ms-search-test-page',
//   templateUrl: './search-test.page.html',
//   styleUrls: ['./search-test.page.scss'],
// })
// export class SearchTestPage {
//   searchForm = this.fb.group({
//     keyword: ['', []],
//     field: ['', []],
//   });

//   constructor(
//     private readonly fb: FormBuilder,
//     private readonly store: Store
//   ) {}
//   search() {
//     this.store.dispatch(new SearchTest());
//   }

// }

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SearchTest } from '@mp/app/search-test/util';
import { Search } from '@mp/app/search/util';
import { ISearch } from '@mp/api/search/util';
import { Observable } from 'rxjs';
import { SearchState } from '@mp/app/search/data-access';
import { IProfile } from '@mp/api/profiles/util';
import { IPost } from '@mp/api/post/util';
import { IEventstore } from '@mp/api/eventstore/util';
// import { Search } from '@mp/app/search/util';

@Component({
  selector: 'app-search',
  templateUrl: './search-test.page.html',
  styleUrls: ['./search-test.page.scss'],
})
export class SearchTestPage {
  segment = 'profiles';

  chatRooms = [
    {
      id: 1,
      name: 'Nikhil',
      photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      about: '95% of depressed people are CS students :)',
    },
    {
      id: 2,
      name: 'Serah',
      photo:
        'https://i.pinimg.com/564x/a6/58/32/a65832155622ac173337874f02b218fb.jpg',
      about: 'The aliens are coming for us!!',
    },
    {
      id: 3,
      name: 'Jess',
      photo:
        'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_icon_159366.png',
      about: 'God first always',
    },
  ];

  posts = [
    {
      id: 1,
      name: 'James',
      photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      postInfo: '95% of depressed people are CS students :)',
      time: 'Just now',
    },
    {
      id: 2,
      name: 'Mark',
      photo:
        'https://i.pinimg.com/564x/a6/58/32/a65832155622ac173337874f02b218fb.jpg',
      postInfo: 'The aliens are coming for us!!',
      time: '3 hours ago',
    },
    {
      id: 3,
      name: 'Sabrina',
      photo:
        'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_icon_159366.png',
      postInfo: 'God first always',
      time: 'Yesterday',
    },
  ];

  // constructor() {}
  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}
  searchResult$: any;
  // searchText!: string;
  // search() {
  //   // if (this.searchForm.valid) {
  //   this.store.dispatch(new Search('dick'));
  //   // }
  // }
  search(e: any) {
    const target = e.target as HTMLTextAreaElement;
    // console.log(target.value, 'targeeeeeeeeeeeeeeeeeet');
    this.store.dispatch(new Search(this.segment, target.value));
    this.searchResult$ = this.store.select(SearchState.searchResults);
    this.searchResult$.subscribe((x: any) => {
      console.log(x, 'xxxxxxxxxxxxxxxxxxxxxxx');
    });
    // this.store
    // .select(SearchState.searchResults)
    // .subscribe((x) => (this.searchResult = x));
    // .subscribe((x) => ( = x));
    // .subscribe((x) => {});
  }

  getdisplay(elem: number) {
    const tabs = ['peopleTab', 'groupsTab', 'postsTab', 'eventsTab'];
    for (let i = 0; i < 4; i++) {
      const tab = document.getElementById(tabs[i]);
      if (tab) {
        tab.style.display = 'none';
      }
    }
    const tab = document.getElementById(tabs[elem - 1]);
    if (tabs[elem - 1] === 'postsTab') {
      this.segment = 'posts';
    } else if (tabs[elem - 1] === 'peopleTab') {
      this.segment = 'profiles';
    }

    if (tab) {
      tab.style.display = 'block';
    }
  }
}
