import {
    AccountDetailsUpdatedEvent,
    AddressDetailsUpdatedEvent,
    ContactDetailsUpdatedEvent,
    CreateProfileCommand,
    OccupationDetailsUpdatedEvent,
    PersonalDetailsUpdatedEvent,
    UpdateProfileStatusCommand,
    ProfileLikedPostUpdatedEvent,
    ProfileDislikedPostsUpdatedEvent,
    ProfilePostAddedEvent,
} from '@mp/api/profiles/util';

import {
  PostLikedEvent,
  PostDislikedEvent,
  PostDislikeRemovedEvent,
  PostLikeRemovedEvent,
  PostCreatedEvent,
} from '@mp/api/post/util';
import { UserCreatedEvent } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import { EventBus, ICommand, IEvent, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';

@Injectable()
export class ProfilesSagas {
  constructor(private readonly eventBus: EventBus) {};
  @Saga()
  onUserCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map(
        (event: UserCreatedEvent) =>
          new CreateProfileCommand({ user: event.user })
      )
    );
  };

  @Saga()
  onAccountDetailsUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccountDetailsUpdatedEvent),
      map(
        (event: AccountDetailsUpdatedEvent) =>
          new UpdateProfileStatusCommand({ profile: event.profile })
      )
    );
  };

  @Saga()
  onAddressDetailsUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(AddressDetailsUpdatedEvent),
      map(
        (event: AddressDetailsUpdatedEvent) =>
          new UpdateProfileStatusCommand({ profile: event.profile })
      )
    );
  };

  @Saga()
  onContactDetailsUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ContactDetailsUpdatedEvent),
      map(
        (event: ContactDetailsUpdatedEvent) =>
          new UpdateProfileStatusCommand({ profile: event.profile })
      )
    );
  };

  @Saga()
  onPersonalDetailsUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(PersonalDetailsUpdatedEvent),
      map(
        (event: PersonalDetailsUpdatedEvent) =>
          new UpdateProfileStatusCommand({ profile: event.profile })
      )
    );
  };

  @Saga()
  onOccupationDetailsUpdated = (
    events$: Observable<any>
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(OccupationDetailsUpdatedEvent),
      map(
        (event: OccupationDetailsUpdatedEvent) =>
          new UpdateProfileStatusCommand({ profile: event.profile })
      )
    );
  };
  @Saga()
  onPostCreated = (
    events$: Observable<any>
  ): Observable<IEvent> => {
    return events$.pipe(
      ofType(PostCreatedEvent),
      map(
        (event: PostCreatedEvent) =>
          this.eventBus.publish(new ProfilePostAddedEvent(
            event.post.postId!,
            event.post.userId!,)
          )
      )
    );
  };
  @Saga()
  onPostDisliked = (
    events$: Observable<any>
  ): Observable<IEvent> => {
    return events$.pipe(
      ofType(PostDislikedEvent),
      map(
        (event: PostDislikedEvent) =>
          this.eventBus.publish(new ProfileDislikedPostsUpdatedEvent(
            event.user,
            event.Onpost.postId!,
            false)
          )
      )
    );
  };

  @Saga()
  onPostDislikedRemoved = (
    events$: Observable<any>
  ): Observable<IEvent> => {
    return events$.pipe(
      ofType(PostDislikeRemovedEvent),
      map(
        (event: PostDislikeRemovedEvent) =>
          this.eventBus.publish(new ProfileDislikedPostsUpdatedEvent(
            event.user,
            event.Onpost.postId!,
            true)
          )
      )
    );
  };

  @Saga()
  onPostLiked = (
    events$: Observable<any>
  ): Observable<IEvent> => {
    return events$.pipe(
      ofType(PostLikedEvent),
      map(
        (event: PostLikedEvent) =>
          this.eventBus.publish(new ProfileLikedPostUpdatedEvent(
            event.user,
            event.Onpost.postId!,
            false)
          )
      )
    );
  };

  @Saga()
  onPostLikedRemoved = (
    events$: Observable<any>
  ): Observable<IEvent> => {
    return events$.pipe(
      ofType(PostLikeRemovedEvent),
      map(
        (event: PostLikeRemovedEvent) =>
          this.eventBus.publish(new ProfileLikedPostUpdatedEvent(
            event.user,
            event.Onpost.postId!,
            true)
          )
      )
    );
  };
}
