import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from './token.service';
import { User } from '../Models/user';
import { UserLogIn } from '../Models/user-log-in';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endPoint = "https://shelfoftales.onrender.com/api/user";

  private userSubject = new BehaviorSubject<User | null>(null);

  public user?: Observable<User | null>;


  constructor(private http : HttpClient, private tokenServ:TokenService) { 
    if (this.tokenServ.hasToken('user')) {

      this.userSubject.next(JSON.parse(this.tokenServ.getToken('user')));
    }
    this.user = this.userSubject.asObservable();
  }


  signIn(newLogin: UserLogIn) {
    return this.http.post<User>(`${this.endPoint}/signin`, newLogin)
      .pipe(
        map(user => {
          this.tokenServ.saveToken('user', JSON.stringify(user));
          this.userSubject.next(user); // Update the userSubject with the logged-in user's data
          return user;
        }),
        catchError(this.handleError<User>("login"))
      );
  }

  getUser() {
    return this.http.get<any>(`${this.endPoint}`);
  }

  logout() { this.tokenServ.deleteToken('user'); this.userSubject.next(null) }

  
  hasToken(): boolean {
    return this.tokenServ.hasToken !== null;
  }

  role(): string {
    return this.tokenServ.getRole('user'); 
  }


  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logout();
      console.error(error);
      console.log(`${ operation } failed: ${ error.message }`);
      return throwError(() => new Error(error.message))
    };
  }
}
