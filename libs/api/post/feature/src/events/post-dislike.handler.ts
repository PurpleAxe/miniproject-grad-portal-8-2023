import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import { PostDislikedEvent} from "@mp/api/post/util";
import {PostsRepository} from "@mp/api/post/data-access";

@EventsHandler(PostDislikedEvent)
export class PostDislikedHandler implements IEventHandler<PostDislikedEvent> {

    // TODO add data access layer
    constructor(private readonly repository: PostsRepository) {}
    async handle(event: PostDislikedEvent) {
        console.log(`${PostDislikedHandler.name} - ${event.Onpost.postId}`);
        await this.repository.likePost(event.Onpost);
    }
}
