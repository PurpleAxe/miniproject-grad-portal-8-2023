import { INotificationBox, INotifications } from '@mp/api/notifications/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class NotificationsRepository {
  async createNotifications(notifications: INotificationBox) {
    return await admin
      .firestore()
      .collection('notifications')
      .doc(notifications.user.userId)
      .update({
        notifications: admin.firestore.FieldValue.arrayUnion(
          notifications.inbox!.at(0)
        ),
      });
  }
  async createInbox(notifications: INotificationBox) {
    return await admin
      .firestore()
      .collection('notifications')
      .doc(notifications.user.userId)
      .set(notifications);
  }

  async deleteNotificationsProfile(notificationsBox: INotificationBox, notifications: INotifications) {
      return await admin
      .firestore()
      .collection('profiles')
      .doc(notificationsBox.user.userId)
      .update({
        notifications : admin.firestore.FieldValue.arrayRemove(
          notifications.notificationID)
      });
  }

  async deleteNotificationsInbox(notificationsBox: INotificationBox, notifications: INotifications) {
    return await admin
    .firestore()
    .collection('notifications')
    .doc(notificationsBox.user.userId)
    .update({
      notifications : admin.firestore.FieldValue.arrayRemove(
        notifications.notificationID)
    });
  }

}
