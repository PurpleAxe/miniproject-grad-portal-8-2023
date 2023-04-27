import { SearchService } from '@mp/api/search/feature';
import { ISearchRequest, ISearchResponse } from '@mp/api/search/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const searchUsers = functions.https.onCall(
  async (request: ISearchRequest): Promise<ISearchResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SearchService);
    const value = service.searchUsers(request);
    return value;
  }
);

export const searchPosts = functions.https.onCall(
  async (request: ISearchRequest): Promise<ISearchResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SearchService);
    const value = service.searchPosts(request);
    return value;
  }
);

export const searchEvents = functions.https.onCall(
  async (request: ISearchRequest): Promise<ISearchResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SearchService);
    const value = service.searchEvents(request);
    return value;
  }
);