import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logIn(formData: any): Observable<any> {
    return this.http.post<any>(`http://localhost:5454/auth/signin`, formData);
  }
}
