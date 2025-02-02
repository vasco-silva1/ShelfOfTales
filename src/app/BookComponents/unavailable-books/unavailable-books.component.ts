import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/book';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-unavailable-books',
  standalone: true,
  imports: [NgIf, NgFor,CommonModule],
  templateUrl: './unavailable-books.component.html',
  styleUrls: ['./unavailable-books.component.css'],
})
export class UnavailableBooksComponent implements OnInit {
  books: Book[] = []; // Array para armazenar os livros indisponíveis
  isLoading = true; // Indicador de carregamento
  errorMessage = ''; // Mensagem de erro

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadUnavailableBooks(); // Carrega os livros indisponíveis ao iniciar o componente
  }

  // Método para carregar livros indisponíveis
  loadUnavailableBooks(): void {
    this.isLoading = true;

    this.bookService.getUnavailableBooks().subscribe({
      next: (data) => {
        this.books = data; // Armazena os livros indisponíveis recebidos
        this.isLoading = false; // Desativa o indicador de carregamento
      },
      error: (err) => {
        console.error('Erro ao carregar livros indisponíveis:', err);
        this.errorMessage = 'Erro ao carregar livros indisponíveis. Tente novamente mais tarde.';
        this.isLoading = false; // Desativa o indicador de carregamento
      },
    });
  }
}
