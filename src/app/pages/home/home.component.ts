import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BookListComponent } from '../../BookComponents/book-list/book-list.component';
import { AvailableBooksComponent } from "../../BookComponents/available-books/available-books.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgIf, AvailableBooksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showModal = true; // Controla a exibição do modal

  constructor(private router: Router) {}

  closeModal() {
    this.showModal = false; // Fecha o modal
  }

  goToLogin() {
    this.router.navigate(['signin']); // Redireciona para a página de login
  }
}

