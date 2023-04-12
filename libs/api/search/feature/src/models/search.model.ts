import { AggregateRoot } from '@nestjs/cqrs';

export class Search extends AggregateRoot implements ISearch {
  constructor() {
    super();
  }
}
