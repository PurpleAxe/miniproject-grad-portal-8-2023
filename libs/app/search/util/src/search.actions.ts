import { ISearch } from '@mp/api/search/util';

export class SearchAction {
  static readonly type = '[Search] Search';
  // constructor(public search: ISearch) {}

  constructor(public readonly field: string, public readonly keyword: string) {}
}
