import { Component } from '@angular/core';
import { User } from '../Models/user';
import { UserService } from '../Services/user.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgClass } from '@angular/common';


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

  constructor(private userService: UserService) { }

  signUp() {
    this.userService.createUser(this.newUser).subscribe(res => this.msg=res);
    console.log(this.msg);
    this.reserUser();
  }

  reserUser() {
    this.newUser = { name: '', email: '', password: '' };
  }
}