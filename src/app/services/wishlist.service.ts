import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:5454';
  getWishlist(): Observable<any> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );

    return this.http.get<any>(`${this.baseUrl}/api/wishlist/`, {
      headers,
    });
  }
  product = {
    productId: '',
  };
  addToWishlist(productId: string): Observable<any> {
    console.log('productId', productId);
    console.log('type of productId', typeof productId);
    this.product.productId = productId;
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );

    return this.http.post<any>(
      `${this.baseUrl}/api/wishlist/add`,
      this.product,
      { headers }
    );
  }
  removeItemFromWishlist(productId: string) {
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );
    return this.http.delete<any>(
      `${this.baseUrl}/api/wishlist/remove/${productId}`,

      { headers }
    );
  }
}
