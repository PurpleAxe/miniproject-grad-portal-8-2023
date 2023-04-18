import { SearchEvent, ISearch } from '@mp/api/search/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Search extends AggregateRoot implements ISearch {
  constructor(public keyword: string, public field: string) {
    super();
  }

  static fromData(search: ISearch): Search {
    const instance = new Search(search.keyword, search.field);
    return instance;
  }

  getSearchRequest() {
    this.apply(new SearchEvent(this.toJson()));
  }

  toJson(): ISearch {
    return {
      keyword: this.keyword,
      field: this.field,
    };
  }
}
