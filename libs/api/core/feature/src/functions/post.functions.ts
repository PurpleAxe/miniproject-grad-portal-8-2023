import {PostService} from '@mp/api/post/feature';
import {ICreatePostRequest, ICreatePostResponse, IDislikePostRequest, IDislikePostResponse, ILikePostRequest, ILikePostResponse} from '@mp/api/post/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

export const createPost = functions.https.onCall(
    async (
        req: ICreatePostRequest
    ): Promise<ICreatePostResponse> => {
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(PostService);
        return service.createPost(req);
    }
);


export const likePost = functions.https.onCall(
    async (
        req: ILikePostRequest
    ): Promise<ILikePostResponse> => {
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(PostService);
        return service.likePost(req);
    }
);

export const dislikePost = functions.https.onCall(
    async (
        req: IDislikePostRequest
    ): Promise<IDislikePostResponse> => {
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(PostService);
        return service.dislikePost(req);
    }
);
