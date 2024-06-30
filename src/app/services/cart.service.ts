import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  //baseUrl = 'http://localhost:5454';
  baseUrl = 'https://e-commercebackendnodejs.onrender.com';
  getUSerCart(): Observable<any> {
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );
    return this.http.get<any>(`${this.baseUrl}/api/cart/`, { headers });
  }

  addToCart(cartData: any) {
    console.log(cartData);
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );
    return this.http.post<any>(`${this.baseUrl}/api/cart/add/`, cartData, {
      headers,
    });
  }

  removeItemFromCart(productId: string) {
    let headers = new HttpHeaders().set(
      'Authorization',
      `bearer ${localStorage.getItem('token')}`
    );
    return this.http.delete<any>(
      `${this.baseUrl}/api/cart/remove/${productId}`,

      { headers }
    );
  }
}
