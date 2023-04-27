import { AggregateRoot } from '@nestjs/cqrs';

export class Comments extends AggregateRoot implements IComments {
  constructor() {
    super();
  }
}
