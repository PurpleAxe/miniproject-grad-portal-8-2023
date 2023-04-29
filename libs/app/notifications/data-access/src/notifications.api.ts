import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { IReadNotificationsRequest, IReadNotificationsResponse } from '@mp/api/notifications/util';
import { INotificationBox, INotifications } from '@mp/api/notifications/util';

@Injectable()
export class NotificationsApi{
    constructor(
        private readonly firestore: Firestore,
        private readonly functions: Functions
    ) {}

    notifications$(id: string) {
        const docRef = doc(
            this.firestore,
            `notifications/${id}`   //check how it is modelled in firebase
        ).withConverter<INotificationBox>({       //convert our firestore data into INotificationBox type
            fromFirestore: (snapshot) => {
                return snapshot.data() as INotificationBox;
            },
            toFirestore: (it: INotificationBox) => it,
        });
        return docData(docRef, { idField: 'id' });
    }

    async markNotificationsAsRead(request: IReadNotificationsRequest) {
        return await httpsCallable<
            IReadNotificationsRequest,
            IReadNotificationsResponse
        >(
          this.functions,
          'markAsRead'
        )(request);
      }

    // async deleteNotifications(request: IDeleteNotificationsRequest) { //we are not going to delete notifications
    //     return await httpsCallable<
    //         IDeleteNotificationsRequest,
    //         IDeleteNotificationsRequest
    //     >(
    //       this.functions,
    //       'deleteNotificationsInbox'
    //     )(request);
    // }
}
