import { FeedService } from '@mp/api/feed/feature';
import { 
    IGetOwnFeedRequest,
    IGetOwnFeedResponse,
    IGetDiscoveryFeedRequest,
    IGetDiscoveryFeedResponse,
    IGetHomeFeedRequest,
    IGetHomeFeedResponse
} from '@mp/api/feed/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const fetchHomeFeed = functions.https.onCall(
    async (
        request: IGetHomeFeedRequest
    ): Promise<IGetHomeFeedResponse> => {
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(FeedService);
        return service.getHomeFeed(request);
    }
);

export const fetchDiscoveryFeed = functions.https.onCall(
    async (
        request: IGetDiscoveryFeedRequest
    ): Promise<IGetDiscoveryFeedResponse> => {
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(FeedService);
        return service.getDiscoveryFeed(request);
    }
);

export const fetchOwnFeed = functions.https.onCall(
    async (
        request: IGetOwnFeedRequest
    ): Promise<IGetOwnFeedResponse> => {
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(FeedService);
        return service.getOwnFeed(request);
    }
);

  