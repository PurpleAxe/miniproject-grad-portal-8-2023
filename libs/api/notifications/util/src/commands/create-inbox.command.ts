import { ICreateInboxRequest } from "../requests";

export class createInboxCommand {
    constructor(public readonly request: ICreateInboxRequest) {}
}
