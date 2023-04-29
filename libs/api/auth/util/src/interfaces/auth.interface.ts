import { Timestamp } from 'firebase-admin/firestore';

export interface IAuth {
  id: string;
  banner?: string;
  displayName?: string | null | undefined;
  userName?: string | null | undefined;
  photoURL?: string | null | undefined;
  email?: string | null | undefined;
  location?: string;
  groups?: [key: string];
  password?: string | null;
  description?: string;
  degree?: string;
  university?: string;
  phoneNumber?: string | null | undefined;
  userDepartments?: [key: string];
  events?: [key: string];
  posts?: [key: string];
  rank?: number;
  notifications?: [key: string];
  timeLeft?: number;
  followers?: [key: string];
  following?: [key: string];
  conversationIDs?: [key: string];
  customClaims?: { [key: string]: any } | null | undefined;
  created?: Timestamp | null | undefined;
}
