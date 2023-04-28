import { IProfile } from '@mp/api/profiles/util';
import { IPost } from '@mp/api/post/util';

export interface ISearch {
  keyword?: string;
  field?: string;
  searchResults?: IProfile[] | IPost[];
  user?: IProfile | null;
}
