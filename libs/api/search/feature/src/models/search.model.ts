import { SearchEvent, ISearch } from '@mp/api/search/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { IProfile } from '@mp/api/profiles/util';
import { IPost } from '@mp/api/post/util';

export class Search extends AggregateRoot implements ISearch {
  constructor(
    public keyword: string,
    public field: string,
    public searchResults?: IProfile[] | IPost[]
  ) {
    super();
  }

  static fromData(search: ISearch): Search {
    const instance = new Search(
      search.keyword,
      search.field,
      search.searchResults
    );
    return instance;
  }

  getSearchRequest() {
    this.apply(new SearchEvent(this.toJSON()));
  }

  toJSON(): ISearch {
    return {
      keyword: this.keyword,
      field: this.field,
      searchResults: this.searchResults,
    };
  }
}
