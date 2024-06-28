import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://e-commercebackendnodejs.onrender.com';
  getAllCategory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/allCategories`);
  }
  getAllSubCategoryByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/subCategories/${category}`);
  }
  getAllSubCategoryItemsBySubCategory(subCategory: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/api/subCategoryItems/${subCategory}`
    );
  }
}
