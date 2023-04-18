import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class NotificationsService {
  constructor(private commandBus: CommandBus) {}
  //TODO your function here

  
}
