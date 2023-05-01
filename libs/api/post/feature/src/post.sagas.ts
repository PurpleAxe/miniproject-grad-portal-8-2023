import { UserCreatedEvent } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import { EventBus, ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { CreatePostCommand } from '@mp/api/post/util';

@Injectable()
export class PostSagas {
  constructor(private readonly eventBus: EventBus) {}
  @Saga()
  onUserCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map((event: UserCreatedEvent) => {
        setTimeout(function () {}.bind(this), 5000);
        return new CreatePostCommand({
          post: {
            userId: event.user.id,
            userName: event.user.displayName,
            challenge: 'newMemberChallenge',
            department: 'newbie',
            message: 'Hi everyone, im on timehive',
            postId: null,
          },
        });
      })
    );
  };
}
