import { IComment } from '../interfaces';

export class UpdateCommentsEvent {
  constructor(public readonly comment: IComment) {}
}
