import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent {

  constructor(private router : Router,private authService : AuthService){}
  listCategory(){
    this.router.navigate(['manager/category']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate([''])
  }
}
