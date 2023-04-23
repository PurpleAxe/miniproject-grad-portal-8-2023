import { ProfilesModule as ProfilesDataAccessModule } from '@mp/api/profiles/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  AddConversationToProfileHandler,
    CreateProfileHandler,
    UpdateAccountDetailsHandler,
    UpdateAddressDetailsHandler,
    UpdateContactDetailsHandler,
    UpdateOccupationDetailsHandler,
    UpdatePersonalDetailsHandler,
    UpdateProfileStatusHandler
} from './commands';
import {
    AccountDetailsUpdatedHandler,
    AddressDetailsUpdatedHandler,
    ContactDetailsUpdatedHandler,
    ConversationAddedHandler,
    OccupationDetailsUpdatedHandler,
    PersonalDetailsUpdatedHandler,
    ProfileCreatedHandler,
    ProfileStatusUpdatedHandler
} from './events';
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
