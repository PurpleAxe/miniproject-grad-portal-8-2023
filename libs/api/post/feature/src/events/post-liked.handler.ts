import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import { PostLikedEvent} from "@mp/api/post/util";
import {PostsRepository} from "@mp/api/post/data-access";

@EventsHandler(PostLikedEvent)
export class PostLikedHandler implements IEventHandler<PostLikedEvent> {

    // TODO add data access layer
    constructor(private readonly repository: PostsRepository) {}
    async handle(event: PostLikedEvent) {
        console.log(`${PostLikedHandler.name} - ${event.Onpost.postId}`);
        await this.repository.likePost(event.Onpost);
    }
}
