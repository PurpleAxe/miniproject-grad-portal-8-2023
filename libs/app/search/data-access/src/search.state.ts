import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import {
  SearchAction as SearchOnAPIAction,
  SearchOnFrontAction,
} from '@mp/app/search/util';
import { SearchApi } from './search.api';
import { ISearchRequest } from '@mp/api/search/util';
import { SetError } from '@mp/app/errors/util';
import { ISearch } from '@mp/api/search/util';

export interface SearchStateModel {
  // searchForm: {
  //   model: {
  field: string;
  keyword: string;
  // result?: [] | null;
  searchResults?: [] | null;
}
// };
// dirty: false;
// status: string;
// errors: object;

@State<SearchStateModel>({
  name: 'searchApi',
  defaults: {
    // searchForm: {
    // model: {
    field: '',
    keyword: '',
    // },
    // dirty: false,
    // status: '',
    // errors: {},
    searchResults: [],

    // },
  },
})
@Injectable()
export class SearchState {
  constructor(
    private readonly searchApi: SearchApi // private readonly store: Store
  ) {}
  @Action(SearchOnFrontAction)
  async searchFront(
    ctx: StateContext<SearchStateModel>,
    { field, keyword }: SearchOnFrontAction
  ) {
    console.log('called Search search');
    try {
      console.log('in try');
      const state = ctx.getState();
      console.log(state, ' state');
      const request: ISearchRequest = {
        search: {
          keyword,
          field,
        },
      };
      console.log(request, ' request');
      const responseRef = await this.searchApi.searchOnFront(request);
      // const response = responseRef.data;
      console.log(responseRef, ' from front checking whats returned');
      // return ctx.dispatch(new response);
      return responseRef;
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
  @Action(SearchOnAPIAction)
  async search(
    ctx: StateContext<SearchStateModel>,
    { field, keyword }: SearchOnAPIAction
  ) {
    console.log('called Search search');
    try {
      console.log('in try');
      const state = ctx.getState();
      console.log(state, ' state');
      const request: ISearchRequest = {
        search: {
          keyword,
          field,
        },
      };
      const responseRef = await this.searchApi.search(request);
      const response = responseRef.data;
      console.log(response, ' from front checking whats returned');
      // return ctx.dispatch(new response);
      return response;
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}

//     const state = ctx.getState();
//     const field = state.searchForm.model.field;
//     const keyword = state.searchForm.model.keyword;
//     const request: ISearchRequest = {
//       search: {
//         field,
//         keyword,
//       },
//     };

//     const responseRef = await this.searchApi.search(request);
//     const response = responseRef.data;
//     return ctx;
//     // return ctx.dispatch(new Search(response.search));
//   } catch (error) {
//     return ctx.dispatch(new SetError((error as Error).message));
//   }
// }

// @Action(Search)
// async search(ctx: StateContext<SearchStateModel>) {
//   try {
//     const state = ctx.getState();
//     const field = state.searchForm.model.field;
//     const keyword = state.searchForm.model.keyword;
//     const request: ISearchRequest = {
//       search: {
//         field,
//         keyword,
//       },
//     };
//     const responseRef = await this.saerchApi.search(request);
//     const response = responseRef.data;
//     // console.log(responseRef);
//     return ctx;
//     // return ctx.dispatch(new Search(response.search));
//   } catch (error) {
//     return ctx.dispatch(new SetError((error as Error).message));
//   }
// }
// }
