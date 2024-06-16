import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:5454';
  getProductFromCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/products/${category}`);
  }
  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/product/${productId}`);
  }

  public categorySubject = new Subject<string>();

  setCategoryData(data: string) {
    console.log('sendedCategoryData :', data);
    this.categorySubject.next(data);
  }
  getCategoryData() {
    return this.categorySubject.asObservable();
  }

  searchAndFilteredProduct(queryData: any): Observable<any> {
    console.log('queryData :', queryData);
    const params = new HttpParams()
      .set('search', queryData.search)
      .set('category', queryData.category)
      .set('brand', queryData.brand);
    return this.http.get<any>(`${this.baseUrl}/api/allProducts/search`, {
      params: params,
    });
  }
}
