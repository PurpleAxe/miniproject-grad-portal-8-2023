import { ISearchRequest } from "../requests";

export class SearchCommand {
    constructor(public readonly request: ISearchRequest,) {}
}