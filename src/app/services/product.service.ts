import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductFromCategory(category: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5454/api/products/${category}`);
  }
  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5454/api/product/${productId}`);
  }
  searchAndFilteredProduct(queryData: any): Observable<any> {
    const params = new HttpParams().set('search', queryData.search);
    return this.http.get<any>(`http://localhost:5454/api/allProducts/search`, {
      params: params,
    });
  }
}
