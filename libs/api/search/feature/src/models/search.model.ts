import {
  SearchEvent,
  ISearch
} from '@mp/api/search/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Search extends AggregateRoot implements ISearch {
  constructor(
    public text: string,
    public field: string
  ) {
    super();
  }

  static fromData(search: ISearch): Search {
    const instance = new Search(
      search.text,
      search.field
    );
    return instance;
  }

  getSearchRequest() {
    this.apply(new SearchEvent(this.toJson()));
  }

  toJson(): ISearch {
    return {
      text: this.text,
      field: this.field
    };
  }
}
