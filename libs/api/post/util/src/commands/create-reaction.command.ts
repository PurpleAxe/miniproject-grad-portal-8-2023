import { ICreateReactionRequest } from "../requests"

export class CreateReactionCommand {
    constructor(public readonly Onpost:ICreateReactionRequest)
    {}
}
