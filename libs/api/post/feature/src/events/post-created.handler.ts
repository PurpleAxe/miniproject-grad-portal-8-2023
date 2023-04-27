import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {PostCreatedEvent} from "@mp/api/post/util";
import {PostsRepository} from "@mp/api/post/data-access";

@EventsHandler(PostCreatedEvent)
export class PostCreatedHandler implements IEventHandler<PostCreatedEvent> {

    // TODO add data access layer
    constructor(private readonly repository: PostsRepository) {}
    async handle(event: PostCreatedEvent) {
        console.log(`${PostCreatedHandler.name} - ${event.post.postId}`);
        console.log();
        console.log();
        console.log(event.post);
        console.log();
        console.log();
        await this.repository.createPost(event.post);
    }
}
