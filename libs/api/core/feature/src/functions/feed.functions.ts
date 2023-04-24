import { FeedService } from '@mp/api/feed/feature';
import { 
    IGetFeedRequest,
    IGetFeedResponse
} from '@mp/api/feed/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const fetchHomeFeed = functions.https.onCall(
    async (
        request: IGetFeedRequest
    ): Promise<IGetFeedResponse> => {
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(FeedService);
        return service.fetchHomeFeed(request);
    }
);
  