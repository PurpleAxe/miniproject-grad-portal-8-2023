import { NotificationsService } from '@mp/api/notifications/feature';
import { 
    IReadNotificationsRequest, 
    IReadNotificationsResponse 
    } from '@mp/api/notifications/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const markAsRead = functions.https.onCall(
    async (
      request: IReadNotificationsRequest
    ): Promise<IReadNotificationsResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(NotificationsService);
      return service.markAsRead(request);
    }
  );
