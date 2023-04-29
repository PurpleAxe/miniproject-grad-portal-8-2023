// import { ISearch } from '@mp/api/search/util';

export class SearchTest {
  static readonly type = '[SearchTest] SearchTest';
  constructor(public readonly field: string, public readonly keyword: string) {}
}
