import { ISearch } from '@mp/api/search/util';

export class Search {
  static readonly type = '[Search] Search';
  constructor(
    public readonly field: string,
    keyword: string,
    result?: [] | null
  ) {}
  // constructor(public readonly result: ISearch) {}
}
