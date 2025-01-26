import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from './token.service';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endPoint = "http://vsrvform01.dei.isep.ipp.pt/api/user/";

  private userSubject = new BehaviorSubject<User | null>(null);

  public user?: Observable<User | null>;


  constructor(private http : HttpClient, private tokenServ:TokenService) { }
}
