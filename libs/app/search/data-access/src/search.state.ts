import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Search, SearchOnFront } from '@mp/app/search/util';
import { SearchApi } from './search.api';
import { ISearchRequest } from '@mp/api/search/util';
import { SetError } from '@mp/app/errors/util';
import { ISearch } from '@mp/api/search/util';
import { IProfile } from '@mp/api/profiles/util';
import { IPost } from '@mp/api/post/util';
import { IEventstore } from '@mp/api/eventstore/util';

export interface SearchStateModel {
  // searchForm: {
  //   model: {
  // field: string;
  // keyword: string;
  // result?: [] | null;
  searchResults: IProfile[] | IPost[] | IEventstore[];
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
    // field: '',
    // keyword: '',
    // },
    // dirty: false,
    // status: '',
    // errors: {},
    searchResults: [],
  },

  // },
  // },
})
@Injectable()
export class SearchState {
  constructor(
    private readonly searchApi: SearchApi // private readonly store: Store
  ) {}

  @Selector()
  static searchResults(state: SearchStateModel) {
    return state.searchResults;
  }
  // @Action(SearchOnFront)
  // async searchFront(
  //   ctx: StateContext<SearchStateModel>,
  //   { field, keyword }: SearchOnFront
  // ) {
  //   const state = ctx.getState();
  //   console.log('ssiba');
  //   console.log('called Search searchzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
  //   // try {
  //   console.log('in try');
  //   try {
  //     const state = ctx.getState();
  //     console.log(state, ' state');
  //     const request: ISearchRequest = {
  //       search: {
  //         keyword,
  //         field,
  //       },
  //     };
  //     console.log(request, ' requestssssssssss');
  //     // const responseRef = await this.searchApi.searchOnFront(field, keyword);
  //     // const response = responseRef.data;
  //     // console.log(responseRef, ' from front checking whats returned');

  //     return this.searchApi.searchUsers(request);
  //     // return responseRef;
  //   } catch (error) {
  //     return ctx.dispatch(new SetError((error as Error).message));
  //   }
  // } catch (e) {
  // console.log('error', e);
  // }
  // }
  //   @Action(SearchOnAPIAction)
  //   async search(
  //     ctx: StateContext<SearchStateModel>,
  //     { field, keyword }: SearchOnAPIAction
  //   ) {
  //     console.log('called Search search');
  //     try {
  //       console.log('in try');
  //       const state = ctx.getState();
  //       console.log(state, ' state');
  //       const request: ISearchRequest = {
  //         search: {
  //           keyword,
  //           field,
  //         },
  //       };
  //       const responseRef = await this.searchApi.search(request);
  //       const response = responseRef.data;
  //       console.log(response, ' from front checking whats returned');
  //       // return ctx.dispatch(new response);
  //       return response;
  //     } catch (error) {
  //       return ctx.dispatch(new SetError((error as Error).message));
  //     }
  //   }
  // }

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

  @Action(Search)
  async search(
    ctx: StateContext<SearchStateModel>,
    { field, keyword }: Search
  ) {
    try {
      // const state = ctx.getState();
      // const field = state.searchForm.model.field;
      // const keyword = state.searchForm.model.keyword;
      ctx.setState({ searchResults: [] });

      const request: ISearchRequest = {
        search: {
          field,
          keyword,
        },
      };
      if (keyword !== '') {
        let responseRef: any;
        if (field === 'people')
          responseRef = await this.searchApi.searchUsers(request);
        if (field === 'posts')
          responseRef = await this.searchApi.searchPosts(request);
        if (field === 'events')
          responseRef = await this.searchApi.searchEvents(request);
        const response = responseRef!.data;
        // console.log(responseRef, 'sssssssssssssssssssssssssssss');
        // console.log(
        //   response!.search!.searchResults,
        //   'xxxxxxxxxxxxxxxxxxxxxxxxxxx'
        // );

        ctx.setState({ searchResults: response!.search!.searchResults });
      }
      // return ctx;
      // return ctx.dispatch(new Search(response.search));
      return;
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
