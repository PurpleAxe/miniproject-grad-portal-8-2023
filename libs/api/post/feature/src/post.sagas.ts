import {UserCreatedEvent} from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import { EventBus, ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import {CreatePostCommand} from '../../util/src/commands';

@Injectable()
export class PostSagas {
  constructor(private readonly eventBus: EventBus) {};
  @Saga()
  onUserCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map(
        (event: UserCreatedEvent) =>
          new CreatePostCommand({
            post: {
              userId: event.user.id,
              userName: event.user.displayName,
              challenge: "newMemberChallenge",
              department: "newbie",
              message: "Hi everyone, im on timehive",
              postId:null
            }
          })
      )
    );
  };
}
