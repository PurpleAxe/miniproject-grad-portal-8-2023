import { Timestamp } from 'firebase-admin/firestore';

export interface INotifications {
  read: boolean | null | undefined;
  message: string | null | undefined;
  url: string | null | undefined;
  notificationID: string | null | undefined;
  notificationTime?: Timestamp | null | undefined;
}
