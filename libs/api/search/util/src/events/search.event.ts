import { ISearch } from '../interfaces';

export class SearchEvent {
  constructor(public readonly profile: ISearch) {}
}
