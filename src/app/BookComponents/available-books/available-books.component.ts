import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/book';
import { NgFor, NgIf } from '@angular/common';
import { GetBookComponent } from '../get-book/get-book.component';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-available-books',
  standalone: true, 
  imports: [NgIf, NgFor,RouterModule],
  templateUrl: './available-books.component.html',
  styleUrls: ['./available-books.component.css'],
})
export class AvailableBooksComponent implements OnInit {
  books: Book[] = []; // Armazena os livros disponíveis
  isLoading = true; // Indicador de carregamento
  errorMessage = ''; // Mensagem de erro
  selectedBookIsbn: string | null = null; // ISBN do livro selecionado para exibição no modal


  constructor(private bookService: BookService,private router : Router) {}

  ngOnInit(): void {
    this.loadAvailableBooks(); // Carrega os livros disponíveis ao iniciar o componente
  }

  // Método para carregar livros disponíveis
  // loadAvailableBooks(): void {
  //   this.isLoading = true;

  //   this.bookService.getAvailableBooks().subscribe({
  //     next: (data) => {
  //       this.isLoading = false; // Desativa o indicador de carregamento
  //     },
  //     error: (err) => {
  //       console.error('Erro ao carregar livros disponíveis:', err);
  //       this.errorMessage = 'Erro ao carregar livros disponíveis. Tente novamente mais tarde.';
  //       this.isLoading = false; // Desativa o indicador de carregamento
  //     },
  //   });
  // }

  private loadAvailableBooks(): void {
    this.isLoading = true;
    this.bookService.getAvailableBooks().subscribe({
      next: (data) => {
        console.log('✅ Livros disponíveis carregados:', data);
        this.books = data; // Agora os livros são armazenados corretamente
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Erro ao carregar livros disponíveis:', err);
        this.errorMessage = 'Erro ao carregar livros disponíveis. Tente novamente mais tarde.';
        this.isLoading = false;
      },
    });
  }

  openBook(isbn: string): void {
    console.log('📖 Livro clicado, ISBN:', isbn); // ✅ Confirma que o ISBN está correto
    this.router.navigate([`/book/available/${isbn}`]); // ✅ Navega para a página do livro
  }

}
