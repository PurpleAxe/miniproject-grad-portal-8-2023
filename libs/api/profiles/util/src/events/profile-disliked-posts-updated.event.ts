export class ProfileDislikedPostsUpdatedEvent {
  constructor(
    public readonly profile: string,
    public readonly post: string
  ) {}
}
