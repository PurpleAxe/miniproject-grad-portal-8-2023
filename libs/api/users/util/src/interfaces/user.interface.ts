import { Timestamp } from 'firebase-admin/firestore';

export interface IUser {
  id: string;
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
  email?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  customClaims?: { [key: string]: any } | null | undefined;
  created?: Timestamp | null | undefined;
}
