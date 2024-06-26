import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  //baseUrl = 'http://localhost:5454';
  baseUrl = 'https://e-commercebackendnodejs.onrender.com';
  logIn(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signin`, formData);
  }

  SignUp(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signup`, formData);
  }
}
