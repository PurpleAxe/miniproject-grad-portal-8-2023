import { NotificationsService } from '@mp/api/notifications/feature';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import {
    ICreateNotificationsRequest,
    ICreateNotificationResponse
} from '@mp/api/notifications/util';

export const createNotification = functions.https.onCall(
    async (
      request: ICreateNotificationsRequest
    ): Promise<ICreateNotificationsResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(NotificationsService);
      return service.updateAccountDetails(request);
    }
  );

  export const getNotification = functions.https.onCall(
    async (
      request: IUpdateAccountDetailsRequest
    ): Promise<IUpdateAccountDetailsResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(ProfilesService);
      return service.updateAccountDetails(request);
    }
  );



  