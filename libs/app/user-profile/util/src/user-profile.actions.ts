import { IProfile } from '@mp/api/profiles/util';

export class Logout {
  static readonly type = '[UserProfile] Logout';
}

export class SubscribeToUserProfile {
  static readonly type = '[UserProfile] SubscribeToUserProfile';
}

export class SetUserProfile {
  static readonly type = '[UserProfile] SetUserProfile';
  constructor(public readonly profile: IProfile | null) {}
}

// export class UpdateAccountDetails {
//   static readonly type = '[Profile] UpdateAccountDetails';
// }

// export class UpdateAddressDetails {
//   static readonly type = '[Profile] UpdateAddressDetails';
// }

// export class UpdateContactDetails {
//   static readonly type = '[Profile] UpdateContactDetails';
// }

// export class UpdateOccupationDetails {
//   static readonly type = '[Profile] UpdateOccupationDetails';
// }

// export class UpdatePersonalDetails {
//   static readonly type = '[Profile] UpdatePersonalDetails';
// }
