import { Injectable } from '@nestjs/common';
import {
  createInboxCommand,
  createNotificationsCommand,
} from '@mp/api/notifications/util';
import { UserCreatedEvent } from '@mp/api/users/util';
import { INotifications } from '@mp/api/notifications/util';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { NotificationsCreatedEvent } from '@mp/api/notifications/util';
import { ProfileCreatedEvent } from '@mp/api/profiles/util';

@Injectable()
export class NotificationsSagas {
  @Saga()
  onUserCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProfileCreatedEvent),
      map(
        (event: ProfileCreatedEvent) =>
          new createInboxCommand({ profile: event.profile })
      )
    );
  };

  @Saga()
  onMessageSent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProfileCreatedEvent),
      map(
        (event: ProfileCreatedEvent) =>
          new createInboxCommand({ profile: event.profile })
      )
    );
  };
}
