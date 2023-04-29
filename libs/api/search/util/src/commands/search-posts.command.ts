import { ISearchRequest } from "../requests";

export class SearchPostsCommand {
    constructor(public readonly request: ISearchRequest,) {}
}