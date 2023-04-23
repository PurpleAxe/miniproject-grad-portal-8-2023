import { ProfilesModule as ProfilesDataAccessModule } from '@mp/api/profiles/data-access';
import { UsersModule } from '@mp/api/users/data-access';
import { PostModule as PostDataAccesModule} from '@mp/api/post/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreatePostHandler,
  DislikePostHandler,
  LikePostHandler,
} from './commands';
import {
  PostCreatedHandler,
  PostDislikedHandler,
  PostDislikeRemovedHandler,
  PostLikedHandler,
  PostLikeRemovedHandler,
} from './events';
import { PostSagas } from './post.sagas';
import { PostService } from './post.service';
export const CommandHandlers = [
  CreatePostHandler,
  DislikePostHandler,
  LikePostHandler,
];
export const EventHandlers = [
  PostCreatedHandler,
  PostDislikedHandler,
  PostDislikeRemovedHandler,
  PostLikedHandler,
  PostLikeRemovedHandler,
];

@Module({
  imports: [CqrsModule, PostDataAccesModule, ProfilesDataAccessModule, UsersModule],
  providers: [
    PostService,
    ...CommandHandlers,
    ...EventHandlers,
    PostSagas,
  ],
  exports: [PostService],
})
export class PostModule {}
