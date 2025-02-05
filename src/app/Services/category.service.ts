import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private theEndPoint = 'https://shelfoftales.onrender.com/api/bookcategory';

  constructor(private http: HttpClient) { }

  /// POST - Create a new category (only for managers)
  createCategory(newCategory: Category): Observable<any> {
    return this.http.post<any>(this.theEndPoint, newCategory);
  }

  // GET - Obtém todas as categorias existentes
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.theEndPoint);
  }
}