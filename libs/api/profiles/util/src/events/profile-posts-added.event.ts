export class ProfilePostAddedEvent {
  constructor(
    public readonly post: string,
    public readonly profile: string,
  ) {}
}
