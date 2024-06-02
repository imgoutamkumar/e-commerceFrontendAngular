import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(`http://localhost:5454/api/payment/`, orderData);
  }
  verifyPayment(paymentData: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:5454/api/payment/verify`,
      paymentData
    );
  }
}
