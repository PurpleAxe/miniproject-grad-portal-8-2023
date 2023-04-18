import { INotifications } from '../../util/src/interfaces';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class NotificationsRepository {
    async createNotifications(notifications: INotifications) {
        return await admin.firestore()
            .collection('notifications')
            .doc(notifications.notificationID) 
            .create(notifications);
      }
      
}

