import { AggregateRoot } from '@nestjs/cqrs';

export class Feed extends AggregateRoot implements IFeed {
  constructor() {
    super();
  }
}
