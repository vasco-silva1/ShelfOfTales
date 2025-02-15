import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from './Models/user';
import { AuthService } from './Services/auth.service';
import { UserAuth } from './Models/user-auth';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoaderComponent } from "./Loader/loader/loader.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ShelfOfTales';
  userSession: UserAuth | null = null;


  constructor(private authService: AuthService,private router : Router,private http:HttpClient) {
  }
  ngOnInit(): void {
    this.authService.user.subscribe(user => this.userSession = user);
  
  }
  logout(): void {
    this.authService.logout();
    this.userSession = null; // Atualiza a variável para refletir o logout
    this.router.navigate(['/']); // ✅ Redireciona para a homepage após o logout
  }

  isClient(): boolean {
    return this.userSession?.role === 'client';
  }

  isManager(): boolean {
    return this.userSession?.role === 'manager';
  }

  isLoggedIn(): boolean {
    return this.userSession !== null;
  }

}
