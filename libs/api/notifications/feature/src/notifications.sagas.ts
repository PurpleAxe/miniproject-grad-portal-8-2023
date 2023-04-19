import { Injectable } from '@nestjs/common';
import { createInboxCommand, createNotificationsCommand } from '../../util/src/commands';
import { UserCreatedEvent } from '@mp/api/users/util';
import { INotifications } from '../../util/src/interfaces';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { NotificationsCreatedEvent } from '../../util/src/events';
import {ProfileCreatedEvent} from '@mp/api/profiles/util';

@Injectable()
export class NotificationsSagas {
  @Saga()
  onUserCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProfileCreatedEvent),
      map(
        (event: ProfileCreatedEvent) =>
          new createInboxCommand({profile: event.profile})
      )
    );
  };
}
