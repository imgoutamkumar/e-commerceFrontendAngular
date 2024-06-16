import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}
  //baseUrl = 'http://localhost:5454';
  baseUrl = 'https://e-commercebackendnodejs.onrender.com';
  createOrder(orderData: any): Observable<any> {
    console.log('orderData:', orderData);
    return this.http.post<any>(`${this.baseUrl}/api/payment/`, orderData);
  }
  verifyPayment(paymentData: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/payment/verify`,
      paymentData
    );
  }
}
