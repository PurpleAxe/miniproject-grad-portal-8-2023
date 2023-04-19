import { SearchService } from '@mp/api/search/feature';
import { ISearchRequest, ISearchResponse } from '@mp/api/search/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const search = functions.https.onCall(
  async (request: ISearchRequest): Promise<ISearchResponse> => {
    console.log('search nestjs');

    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(SearchService);
    const value = service.getSearchRequest(request);
    console.log(value, 'in functions value console');
    return value;
  }
);
