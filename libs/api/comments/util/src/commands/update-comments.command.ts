import { IUpdateCommentsRequest } from '../requests';

export class UpdateCommentsCommand {
  constructor(public readonly request: IUpdateCommentsRequest) {}
}
