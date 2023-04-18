import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { Search } from '@mp/app/search/util';
import { SearchApi } from './search.api';
import { ISearchRequest } from '@mp/api/search/util';
import { SetError } from '@mp/app/errors/util';

export interface SearchStateModel {
  searchForm: {
    model: {
      field: string;
      keyword: string;
      result?: [] | null;
    };
    dirty: false;
    status: string;
    errors: object;
  };
}
@State<SearchStateModel>({
  name: 'search',
  defaults: {
    searchForm: {
      model: {
        field: '',
        keyword: '',
        result: [],
      },
      dirty: false,
      status: '',
      errors: {},
    },
  },
})
@Injectable()
export class SearchState {
  constructor(
    private readonly saerchApi: SearchApi // private readonly store: Store
  ) {}
  @Action(Search)
  async search(ctx: StateContext<SearchStateModel>) {
    try {
      const state = ctx.getState();
      const field = state.searchForm.model.field;
      const keyword = state.searchForm.model.keyword;
      const request: ISearchRequest = {
        search: {
          field,
          keyword,
        },
      };
      const responseRef = await this.saerchApi.search(request);
      const response = responseRef.data;
      // console.log(responseRef);
      return ctx;
      // return ctx.dispatch(new Search(response.search));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
