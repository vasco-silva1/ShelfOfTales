import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endPoint = "http://shelfoftales.onrender.com/api/user";

  constructor(private http : HttpClient) { }
  
  createUser(newUser: User): Observable<any> {
    return this.http.post<any>(this.endPoint, newUser);
  }

}
