import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
// import { SearchApi } from '../../../search/data-access/src/search.api';
import { Search } from '@mp/app/search-test/util';
import { SetError } from '@mp/app/errors/util';
import { Search as SearchFeature } from '@mp/app/search/util';
// import { ISearchRequest } from '@mp/api/search/util';

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
  },
})
@Injectable()
export class SearchTestState {
  // constructor(
  //   private readonly saerchApi: SearchApi,
  //   private readonly store: Store
  // ) {}
  @Action(Search)
  async search(ctx: StateContext<SearchTestStateModel>) {
    try {
      const state = ctx.getState();
      const keyword = state.searchForm.model.keyword;
      const field = state.searchForm.model.field;
      if (field && keyword) {
        return ctx.dispatch(new SearchFeature(keyword, field));
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
