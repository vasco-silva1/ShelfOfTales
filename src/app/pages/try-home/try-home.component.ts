import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SignInComponent } from "../../sign-in/sign-in.component";
import { SignUpComponent } from "../../sign-up/sign-up.component";
import { NgIf } from '@angular/common';
import { HighlightDirective } from '../../Directives/highlight.directive';
import { AuthService } from '../../Services/auth.service';
import { BookService } from '../../Services/book.service';

@Component({
  selector: 'app-try-home',
  standalone: true,
  imports: [HighlightDirective,NgIf],
  templateUrl: './try-home.component.html',
  styleUrl: './try-home.component.css'
})
export class TryHomeComponent implements OnInit {
  authActive = false;
  nrBooks: number = 0; // Store the count 
  isLoading: boolean = true; // Start with loading state

  ngOnInit(): void {
    this.getBookCount()
}
  

  getBookCount(){
    this.bookService.getAvailableBooks().subscribe(books => {
      this.nrBooks = books.length;})
      this.isLoading = false;
      
  }


  constructor(private router : Router,private bookService : BookService){    // ✅ Detects when a SignIn/SignUp route is active
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.authActive = event.url.includes('/signin') || event.url.includes('/signup');
      }
    });
  }

  openAvailableBooks() {
    this.router.navigate(['/book']);
  }

    // Redireciona para a página de Login
    openSignIn(): void {
      this.router.navigate(['/signin']);
    }
  
    // Redireciona para a página de Cadastro
    openSignUp(): void {
      this.router.navigate(['/SignUp']);
    }

    
  
}
