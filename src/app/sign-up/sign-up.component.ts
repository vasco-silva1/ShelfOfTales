import { Component } from '@angular/core';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  newUser: User ={ name: '', email: '', password: '' };
  msg: string = '';

  constructor(private userService: UserService,private router : Router) { }

  signUp() {
    this.userService.createUser(this.newUser).subscribe({
      next: (response) => {
        console.log('User created successfully:', response);
        alert('Sign up successful! Welcome to our platform.');
        this.resetUser();
        this.router.navigate(['signin'])
      },
      error: (error) => {
        console.error('Error during sign up:', error);
        alert('Sign up failed. Please try again.');
      }
    });}

    back(){
      this.router.navigate([''])
   }
  resetUser() {
    this.newUser = { name: '', email: '', password: '' };
  }
}