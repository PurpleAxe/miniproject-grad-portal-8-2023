import { AggregateRoot } from '@nestjs/cqrs';
import { IPost } from '@mp/api/post/util';
import { IFeed } from '@mp/api/feed/util'; 
import { GetOwnFeedEvent, GetDiscoveryFeedEvent, GetHomeFeedEvent } from '@mp/api/feed/util';
import { IProfile } from '@mp/api/profiles/util';

export class Feed extends AggregateRoot implements IFeed {
  constructor(
    public readonly user: IProfile,
    public readonly posts: IPost[]
    ) {
    super();
  }

    static fromData(feed: IFeed): Feed {
      const instance = new Feed(
        feed.user,
        feed.posts
      );
      return instance;
    }

    toJSON(): IFeed {
      return {
        user: this.user,
        posts: this.posts
      };
    }
  
}
