import {
  IReadNotificationsRequest,
  IReadNotificationsResponse,
  ReadNotificationsCommand
} from '@mp/api/notifications/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class NotificationsService {
  constructor(private commandBus: CommandBus) {}
  //TODO your function here
  async markAsRead(
    request: IReadNotificationsRequest
  ): Promise<IReadNotificationsResponse> {
    return await this.commandBus.execute<
    ReadNotificationsCommand,
      IReadNotificationsResponse
    >(new ReadNotificationsCommand(request));
  }

}
