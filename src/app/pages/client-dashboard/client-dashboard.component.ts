import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent {

  constructor(private router : Router,private authService : AuthService){}
  listCategory(){
    this.router.navigate(['client/category']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate([''])
  }
}
