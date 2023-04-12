import {
  SearchEvent,
  ISearch
} from '@mp/api/search/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Search extends AggregateRoot implements ISearch {
  constructor(
    public text: string
  ) {
    super();
  }

  getSearchRequest(search: ISearch) {
    this.apply(new SearchEvent(this));
  }
}
