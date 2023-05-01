import { IReadNotificationsRequest } from "../requests";

export class ReadNotificationsCommand {
    constructor(public readonly request: IReadNotificationsRequest) {}
}