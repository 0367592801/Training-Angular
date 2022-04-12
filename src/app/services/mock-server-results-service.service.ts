import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { PagedData } from '../model/paged-data';
import { Post } from '../model/post';
import { Page } from '../model/page';

/**
 * A server used to mock a paged data result from a server
 */
@Injectable({
  providedIn: 'root'
})
export class MockServerResultsService {
  /**
   * A method that mocks a paged server response
   * @param page The selected page
   * @returns {any} An observable containing the employee data
   */
  public getResults(page: Page, postData: Array<Post>): Observable<PagedData<Post>> {
    return of(postData)
      .pipe(map((d) => this.getPagedData(page, postData)))
      .pipe(delay(1000 * Math.random()));
  }

  /**
   * Package companyData into a PagedData object based on the selected Page
   * @param page The page data used to get the selected data from companyData
   * @returns {PagedData<Post>} An array of the selected data and page
   */
  private getPagedData(page: Page, postData: Array<Post>): PagedData<Post> {
    console.log(page, postData);
    const pagedData = new PagedData<Post>();
    page.totalElements = postData.length;
    page.totalPages = page.totalElements / page.size;
    const start = page.pageNumber * page.size;
    const end = Math.min(start + page.size, page.totalElements);
    for (let i = start; i < end; i++) {
      const jsonObj = postData[i];
      const post = new Post(
        jsonObj.id,
        jsonObj.userId,
        jsonObj.title,
        jsonObj.body
      );
      pagedData.data.push(post);
    }
    pagedData.page = page;
    return pagedData;
  }
}
