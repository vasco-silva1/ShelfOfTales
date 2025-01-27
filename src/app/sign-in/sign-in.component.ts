import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { UserLogIn } from '../Models/user-log-in';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  newLogin :UserLogIn = { email: '', password: '' };
  constructor(private authServ: AuthService, private router : Router) { }

  signIn() {
    this.authServ.signIn(this.newLogin).subscribe({
      next: (response) => {
        console.log('User logged in successfully:', response);
        
        alert(`Sign in successful! Welcome back.${this.authServ.role()}`);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error during sign in:', error);
        alert('Sign in failed. Please try again.');
      }
    });
  }

  resetLogin() {
    this.newLogin = { email: '', password: '' };
  }
}
