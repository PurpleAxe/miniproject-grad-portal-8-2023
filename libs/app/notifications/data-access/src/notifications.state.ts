import { Injectable } from '@angular/core';
import {
    INotifications, ICreateNotificationsResponse, ICreateInboxRequest, ICreateNotificationsRequest, INotificationBox
    //notification necessary interfaces
} from '@mp/api/notifications/util'
import { AuthState } from '@mp/app/auth/data-access';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { NotificationsApi } from './notifications.api'
import {
    Logout, SubscribeToNotifications, SetNotifications, MarkAsReadNotification, DeleteNotification
} from '@mp/app/notifications/util';
import { IReadNotificationsRequest, IReadNotificationsResponse } from '@mp/api/notifications/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store'
import { SetError } from '@mp/app/errors/util';
import produce from 'immer';
import { tap } from 'rxjs';

export interface NotificationsStateModel {
    notificationsBox: INotificationBox | null  |undefined;
    // notifications: INotifications [] | null;
    // notification: null;
    // memberId: null;
    // notificationId: null;
}

@State<NotificationsStateModel>({
    name: 'notifications',
    defaults: {
        notificationsBox: null,
        // notifications: null
        // notification: null,
        // memberId: null,
        // notificationId: null 
    },
})
@Injectable()
export class NotificationsState {
    constructor(
        private readonly notificationsApi: NotificationsApi,
        private readonly store: Store
    ) { }

    @Selector()
    static notificationBox(state: NotificationsStateModel) {
        return state.notificationsBox;
    }

    @Action(Logout)
    async logout(ctx: StateContext<NotificationsStateModel>) {
        return ctx.dispatch(new AuthLogout());
    }

    @Action(SubscribeToNotifications)
    subscribeToNotifications(ctx: StateContext<NotificationsStateModel>) {
        console.log("In subscribeToNotifications function");
        const user = this.store.selectSnapshot(AuthState.user);
        if (!user) return ctx.dispatch(new SetError('User not set'));

        return this.notificationsApi
            .notifications$(user.uid)
            .pipe(tap((notificationBox: INotificationBox) => ctx.dispatch(new SetNotifications(notificationBox))));
    }

    @Action(SetNotifications)
    setNotifications(ctx: StateContext<NotificationsStateModel>, { notifications }: SetNotifications) {
        return ctx.setState(
            produce((draft) => {
                draft.notificationsBox = notifications;
            })
        );
    }

    //ask if cloud functions are going to be used
    @Action(MarkAsReadNotification)
    async markAsRead(ctx: StateContext<NotificationsStateModel>) {
        try {
            const state = ctx.getState();
            const currNotificationsBox = state.notificationsBox;
            const request:IReadNotificationsRequest = {
                notificationBox:currNotificationsBox,
            };


            const responseRef = await this.notificationsApi.markNotificationsAsRead(request);
            const response = responseRef.data;
            return ctx.dispatch(new MarkAsReadNotification(response));
        } catch (error) {
            return ctx.dispatch(new SetError((error as Error).message))
        }
    }

    // @Action(DeleteNotification) //we will not be deleting notifications
    // deleteNotifications(ctx: StateContext<NotificationsStateModel>, { notification }: DeleteNotification) {
    //         try {
    //         const state = ctx.getState();

    //         const request:IDeleteNotificationsRequest = {
    //             notificationsBox: {
    //                 userId,
    //             },
    //         };


    //         const responseRef = await this.notificationsApi.deleteNotifications(request);
    //         const response = responseRef.data;
    //         return ctx.dispatch(new SetNotifications(response));
    //     } catch (error) {
    //         return ctx.dispatch(new SetError((error as Error).message))
    //     }
    // }
}
