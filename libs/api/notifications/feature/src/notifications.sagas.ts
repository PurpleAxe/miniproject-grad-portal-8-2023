import { Injectable } from '@nestjs/common';
import { createNotificationsCommand } from '../../util/src/commands';
import { UserCreatedEvent } from '@mp/api/users/util';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { NotificationsCreatedEvent } from '../../util/src/events';

@Injectable()
export class NotificationsSagas {
  @Saga()
  onUserCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationsCreatedEvent),
      map(
        (event: NotificationsCreatedEvent) =>
          new createNotificationsCommand({ notifications: event.notifications })
      )
    );
  };
}
