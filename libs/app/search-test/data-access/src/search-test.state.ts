import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
// import { SearchApi } from '../../../search/data-access/src/search.api';
import { SearchTest } from '@mp/app/search-test/util';
import { SetError } from '@mp/app/errors/util';
import { SearchAction as SearchFeature } from '@mp/app/search/util';
// import { ISearchRequest } from '@mp/api/search/util';
import { ISearch } from '@mp/api/search/util';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchTestStateModel {
  searchForm: {
    model: {
      keyword: string;
      field: string;
    };
    dirty: false;
    status: string;
    errors: object;
  };
  searchResults?: [];
}
@State<SearchTestStateModel>({
  name: 'search',
  defaults: {
    searchForm: {
      model: {
        keyword: '',
        field: '',
      },
      dirty: false,
      status: '',
      errors: {},
    },
    searchResults: [],
  },
})
@Injectable()
export class SearchTestState {
  // constructor(
  //   private readonly saerchApi: SearchApi,
  //   private readonly store: Store
  // ) {}
  @Action(SearchTest)
  async search(ctx: StateContext<SearchTestStateModel>) {
    try {
      const state = ctx.getState();
      const keyword = state.searchForm.model.keyword;
      const field = state.searchForm.model.field;
      // console.log(keyword, field);
      if (field && keyword) {
        console.log(field, keyword, '!!!!!!!!!!!!!!!!!!');
        return ctx.dispatch(new SearchFeature(field, keyword));
      }
      // const request: ISearchRequest = {
      // search: {
      // field: 'email',
      // keyword: keyword,
      // },
      // };
      // const responseRef = await this.saerchApi.search1(request);
      // const response = responseRef.data;
      // console.log(responseRef);
      // return ctx;
      return ctx.dispatch(new SetError('Keyword and field not set'));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
