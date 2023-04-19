import { ISearch } from '@mp/api/search/util';
//this is for going through api
export class SearchAction {
  static readonly type = '[Search] Search';
  // constructor(public search: ISearch) {}

  constructor(public readonly field: string, public readonly keyword: string) {}
}
//for front
export class SearchOnFrontAction {
  static readonly type = '[Search] SearchOnFront';
  // constructor(public search: ISearch) {}

  constructor(public readonly field: string, public readonly keyword: string) {}
}
