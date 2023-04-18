import { AggregateRoot } from '@nestjs/cqrs';

export class Notifications extends AggregateRoot implements INotifications {
  constructor() {
    super();
  }
}
