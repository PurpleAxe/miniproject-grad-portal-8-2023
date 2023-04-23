import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import { PostDislikeRemovedEvent} from "@mp/api/post/util";
import {PostsRepository} from "@mp/api/post/data-access";

@EventsHandler(PostDislikeRemovedEvent)
export class PostDislikeRemovedHandler implements IEventHandler<PostDislikeRemovedEvent> {

    // TODO add data access layer
    constructor(private readonly repository: PostsRepository) {}
    async handle(event: PostDislikeRemovedEvent) {
        console.log(`${PostDislikeRemovedHandler.name} - ${event.Onpost.postId}`);
        await this.repository.likePost(event.Onpost);
    }
}
