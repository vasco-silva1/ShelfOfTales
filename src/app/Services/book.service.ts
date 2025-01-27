import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly API_URL = 'https://shelfoftales.onrender.com/api/book';

  constructor(private http: HttpClient) {}

  // Cria um novo livro (role: manager)
  createBook(book: any): Observable<any> {
    return this.http.post(`${this.API_URL}`, book);
  }

  // Obtem todos os livros existentes (role: client)
  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  // Obtem todos os livros disponíveis (sem restrições)
  getAvailableBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/available`);
  }

  // Obtem todos os livros inexistentes (role: manager)
  getUnavailableBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/unavailable`);
  }

  // Obtem um livro pelo ISBN (sem restrições)
  getBookByIsbn(isbn: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${isbn}`);
  }

  // Remove um livro pelo ISBN (role: manager)
  deleteBook(isbn: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${isbn}`);
  }

  // Atualiza um livro pelo ISBN (role: manager)
  updateBook(isbn: string, book: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${isbn}`, book);
  }

  // Atualiza a disponibilidade de um livro pelo ISBN (role: manager)
  updateBookAvailability(isbn: string, availability: boolean): Observable<any> {
    return this.http.patch(`${this.API_URL}/${isbn}/availability`, { availability });
  }
}
