import { AuthModule } from '@mp/api/auth/feature';
import { EventstoreModule } from '@mp/api/eventstore/feature';
import { NotificationsModule } from '@mp/api/notifications/feature';
import { ProfilesModule } from '@mp/api/profiles/feature';
import { UsersModule } from '@mp/api/users/feature';
import { MessageModule } from '@mp/api/message/feature';
import { PostModule } from '@mp/api/post/feature';
import { FeedModule } from '@mp/api/feed/feature';
import { CommentsModule } from '@mp/api/comments/feature';
import { Module } from '@nestjs/common';
import { SearchModule } from '@mp/api/search/feature';

@Module({
  imports: [
    AuthModule,
    EventstoreModule,
    ProfilesModule,
    UsersModule,
    PostModule,
    FeedModule,
    NotificationsModule,
    MessageModule,
    SearchModule,
    CommentsModule,
  ],
})
export class CoreModule {}
