import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class FeedService {
  constructor(private commandBus: CommandBus) {}
  //TODO your function here
}
