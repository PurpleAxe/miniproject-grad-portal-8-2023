import { CommentsService } from '@mp/api/comments/feature';
import { 
    IUpdateCommentsRequest,
    IUpdateCommentsResponse
} from '@mp/api/comments/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const updateComments = functions.https.onCall(
    async (
        req: IUpdateCommentsRequest
    ): Promise<IUpdateCommentsResponse> => {
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(CommentsService);
        return service.updateComments(req);
    }
);
  