import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/book';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-available-books',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './available-books.component.html',
  styleUrls: ['./available-books.component.css'],
})
export class AvailableBooksComponent implements OnInit {
  books: Book[] = []; // Armazena os livros disponíveis
  isLoading = true; // Indicador de carregamento
  errorMessage = ''; // Mensagem de erro

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadAvailableBooks(); // Carrega os livros disponíveis ao iniciar o componente
  }

  // Método para carregar livros disponíveis
  loadAvailableBooks(): void {
    this.isLoading = true;

    this.bookService.getAvailableBooks().subscribe({
      next: (data) => {
        this.isLoading = false; // Desativa o indicador de carregamento
      },
      error: (err) => {
        console.error('Erro ao carregar livros disponíveis:', err);
        this.errorMessage = 'Erro ao carregar livros disponíveis. Tente novamente mais tarde.';
        this.isLoading = false; // Desativa o indicador de carregamento
      },
    });
  }


}
