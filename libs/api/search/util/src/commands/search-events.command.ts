import { ISearchRequest } from "../requests";

export class SearchEventsCommand {
    constructor(public readonly request: ISearchRequest,) {}
}