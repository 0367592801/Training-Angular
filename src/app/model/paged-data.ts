import { Page } from './page';
import { Post } from './post';

/**
 * An array of data with an associated page object used for paging
 */
export class PagedData<Post> {
  data = new Array<Post>();
  page = new Page();
}
