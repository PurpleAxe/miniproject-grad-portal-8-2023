import { ProfilesModule as ProfilesDataAccessModule } from '@mp/api/profiles/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProfilePostAddedEvent } from '@mp/api/profiles/util';
import {
  AddConversationToProfileHandler,
  CreateProfileHandler,
  UpdateAccountDetailsHandler,
  UpdateAddressDetailsHandler,
  UpdateContactDetailsHandler,
  UpdateOccupationDetailsHandler,
  UpdatePersonalDetailsHandler,
  UpdateProfileStatusHandler,
} from './commands';
import {
  AccountDetailsUpdatedHandler,
  AddressDetailsUpdatedHandler,
  ContactDetailsUpdatedHandler,
  ConversationAddedHandler,
  OccupationDetailsUpdatedHandler,
  PersonalDetailsUpdatedHandler,
  ProfileCreatedHandler,
  ProfileDislikedPostHandler,
  ProfilePostAddedHandler,
  ProfileStatusUpdatedHandler,
} from './events';
import { ProfileLikedPostUpdatedHandler } from './events/profile-liked-posts-updated.handler';
import { ProfilesSagas } from './profiles.sagas';
import { ProfilesService } from './profiles.service';
export const CommandHandlers = [
  CreateProfileHandler,
  UpdateContactDetailsHandler,
  UpdateAddressDetailsHandler,
  UpdatePersonalDetailsHandler,
  UpdateOccupationDetailsHandler,
  UpdateAccountDetailsHandler,
  UpdateProfileStatusHandler,
  AddConversationToProfileHandler,
];
export const EventHandlers = [
  ProfileCreatedHandler,
  ContactDetailsUpdatedHandler,
  AddressDetailsUpdatedHandler,
  PersonalDetailsUpdatedHandler,
  OccupationDetailsUpdatedHandler,
  AccountDetailsUpdatedHandler,
  ProfileStatusUpdatedHandler,
  ProfilePostAddedHandler,
  ProfileDislikedPostHandler,
  ProfileLikedPostUpdatedHandler,
  ConversationAddedHandler,
];

@Module({
  imports: [CqrsModule, ProfilesDataAccessModule],
  providers: [
    ProfilesService,
    ...CommandHandlers,
    ...EventHandlers,
    ProfilesSagas,
  ],
  exports: [ProfilesService],
})
export class ProfilesModule {}
