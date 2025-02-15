import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../Models/user';
import { UserAuth } from '../Models/user-auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endPoint = "https://shelfoftales.onrender.com/api/user";

  constructor(private http : HttpClient) { }
  
  createUser(newUser: User): Observable<any> {
    return this.http.post<any>(`${this.endPoint}/signup`, newUser);
  }
  getUserInfo(): Observable<UserAuth> {
    return this.http.get<UserAuth>(`${this.endPoint}`);
  }

}
