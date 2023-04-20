import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { IConversation } from '@mp/api/message/util';
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

    //confirm if this should be done through a cloud function. Need to make response and request interfaces
    // async markNotificationsAsRead(request: IMarkAsReadRequest) {
    //     return await httpsCallable<
    //         IMarkAsReadRequest,
    //         IMarkAsReadResponse
    //     >(
    //       this.functions,
    //       'markNotificationsAsRead'
    //     )(request);
    //   }

    // async deleteNotifications(request: IDeleteNotificationsRequest) {
    //     return await httpsCallable<
    //         IDeleteNotificationsRequest,
    //         IDeleteNotificationsRequest
    //     >(
    //       this.functions,
    //       'deleteNotificationsInbox'
    //     )(request);
    // }
}
