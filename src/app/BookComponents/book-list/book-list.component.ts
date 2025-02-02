import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/book';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgIf,FormsModule,NgFor],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: Book[] = []; // Array para armazenar os livros
  isLoading = true; // Indicador de carregamento
  errorMessage = ''; // Mensagem de erro

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks()
  }

 // Método para carregar os livros
 loadBooks(): void {
  this.bookService.getAllBooks().subscribe({
    next: (data) => {
      this.books = data; // Armazena os livros recebidos
      this.isLoading = false; // Desativa o indicador de carregamento
    },
    error: (err) => {
      console.error('Erro ao carregar livros:', err);
      this.errorMessage = 'Erro ao carregar livros. Tente novamente mais tarde.';
      this.isLoading = false; // Desativa o indicador de carregamento
    },
  });
}
}