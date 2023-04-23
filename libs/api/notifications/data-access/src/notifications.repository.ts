import { INotificationBox } from '@mp/api/notifications/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { get } from 'http';
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

  // async deleteNotificationsProfile(notifications: INotificationBox, notifications: INotifications) {
  //     return await admin
  //     .firestore()
  //     .collection('profiles')
  //     .doc(notifications.user.userId)
  //     .update({
  //       notifications : admin.firestore.FieldValue.arrayRemove(
  //         notifications.notificationID)
  //     });
  // }

  // async deleteNotificationsInbox(notifications: INotificationBox, notifications: INotifications) {
  //   return await admin
  //   .firestore()
  //   .collection('notifications')
  //   .doc(notifications.user.userId)
  //   .update({
  //     notifications : admin.firestore.FieldValue.arrayRemove(
  //       notifications.notificationID)
  //   });
  // }

  async markNotificationsAsRead(notifications: INotificationBox) {
    const doc = await admin
    .firestore()
    .collection("notifications")
    .doc(notifications.user.userId)
    .get()

    var oldInbox = doc.data().inbox;
    for(var old of oldInbox)
      for(var current of notifications.inbox)
        if(old.notificationID == current.notificationID)
          old.read = true;

    return await admin
    .firestore()
    .collection('notifications')
    .doc(notifications.user.userId)
    .set({user: doc.data().user, inbox: oldInbox});
  }
}
