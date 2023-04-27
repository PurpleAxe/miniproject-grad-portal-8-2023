import { ISearchRequest } from "../requests";

export class SearchUsersCommand {
    constructor(public readonly request: ISearchRequest,) {}
}