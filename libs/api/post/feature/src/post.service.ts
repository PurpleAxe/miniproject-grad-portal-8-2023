import {
  ILikePostRequest,
  ILikePostResponse,
  ICreatePostRequest,
  ICreatePostResponse,
  IDislikePostRequest,
  IDislikePostResponse,
  LikePostCommand,
  CreatePostCommand,
  DislikePostCommand,
  ICreateCommentRequest,
  ICreateCommentResponse,
  CreateCommentCommand,
} from '@mp/api/post/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class PostService {
  constructor(private readonly commandBus: CommandBus) {}

  async createPost(
    request: ICreatePostRequest
  ): Promise<ICreatePostResponse> {
    return await this.commandBus.execute<
      CreatePostCommand,
      ICreatePostResponse
    >(new CreatePostCommand(request));
  }

  async likePost(
    request: ILikePostRequest
  ): Promise<ILikePostResponse> {
    return await this.commandBus.execute<
      LikePostCommand,
      ILikePostResponse
    >(new LikePostCommand(request));
  }

  async dislikePost(
    request: IDislikePostRequest
  ): Promise<IDislikePostResponse> {
    return await this.commandBus.execute<
      DislikePostCommand,
      IDislikePostResponse
    >(new DislikePostCommand(request));
  }

  async commentOnPost(
    request: ICreateCommentRequest
  ): Promise<ICreateCommentResponse>{
    return await this.commandBus.execute<
    CreateCommentCommand,
    ICreateCommentResponse
    >(new CreateCommentCommand(request));

  }
}
