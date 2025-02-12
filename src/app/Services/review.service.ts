import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetReview } from '../Models/get-review';
import { SendReview } from '../Models/SendReview';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
private theEndPoint = 'https://shelfoftales.onrender.com/api/review';

  constructor(private http: HttpClient) { }

  /// POST - Create a new category (only for managers)
  createReview(newReview:SendReview): Observable<any> {
    return this.http.post<any>(this.theEndPoint, newReview);
  }

  // GET - Obtém todas as reviews de um livro com o isbn especificado
  getAllReviews(isbn:string): Observable<GetReview[]> {
    return this.http.get<GetReview[]>(`${this.theEndPoint}/${isbn}`);
  }
  
}
