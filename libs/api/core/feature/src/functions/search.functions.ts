import { SearchService } from '@mp/api/search/feature';
import {
    ISearchRequest,
    ISearchResponse,
} from '@mp/api/search/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const getSearchRequest = functions.https.onCall(
    async (
      request: ISearchRequest
    ): Promise<ISearchResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(SearchService);
      var value = service.getSearchRequest(request);
      return service.getSearchRequest(request);
    }
  );