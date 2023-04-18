import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormBuilder } from '@angular/forms';
import { Search } from '@mp/app/search-test/util';
import { ISearch } from '@mp/api/search/util';

@Component({
  selector: 'ms-search-test-page',
  templateUrl: './search-test.page.html',
  styleUrls: ['./search-test.page.scss'],
})
export class SearchTestPage {
  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}
  searchForm = this.fb.group({
    keyword: ['', []],
    field: ['', []],
  });

  search() {
    if (this.searchForm.valid) {
      this.store.dispatch(new Search());
    }
  }

  // searchText!: string;
  // search() {
  //   // if (this.searchForm.valid) {
  //   this.store.dispatch(new Search('dick'));
  //   // }
  // }
}
