import { AuthModule } from '@mp/api/auth/feature';
import { EventstoreModule } from '@mp/api/eventstore/feature';
import { ProfilesModule } from '@mp/api/profiles/feature';
import { UsersModule } from '@mp/api/users/feature';
import { MessageModule } from '@mp/api/message/feature';
import { PostModule } from '@mp/api/post/feature';
import { FeedModule } from '@mp/api/feed/feature';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, EventstoreModule, ProfilesModule, UsersModule, MessageModule, PostModule, FeedModule],
})
export class CoreModule {}
