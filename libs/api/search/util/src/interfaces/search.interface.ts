import { IUser } from '@mp/api/users/util';

export interface ISearch {
  keyword?: string;
  field?: string;
  searchResults?: object[] | IUser[] | null;
}
