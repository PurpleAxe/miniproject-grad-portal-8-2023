import { Module } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { PostModule as PostDataAccesModule } from '@mp/api/post/data-access';

@Module({
  // imports: [PostDataAccesModule],
  providers: [CommentsRepository],
  exports: [CommentsRepository],
})
export class CommentsModule {}
