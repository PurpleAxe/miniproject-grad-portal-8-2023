import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import { PostLikeRemovedEvent} from "@mp/api/post/util";
import {PostsRepository} from "@mp/api/post/data-access";

@EventsHandler(PostLikeRemovedEvent)
export class PostLikeRemovedHandler implements IEventHandler<PostLikeRemovedEvent> {

    // TODO add data access layer
    constructor(private readonly repository: PostsRepository) {}
    async handle(event: PostLikeRemovedEvent) {
        console.log(`${PostLikeRemovedHandler.name} - ${event.Onpost.postId}`);
        await this.repository.removeLike(event.Onpost);
    }
}
