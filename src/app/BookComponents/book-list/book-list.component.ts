import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/book';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgIf,FormsModule,NgFor,RouterOutlet],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: Book[] = []; // Array para armazenar os livros
  isLoading = true; // Indicador de carregamento
  errorMessage = ''; // Mensagem de erro
  selectedBookIsbn: string | null = null; // ISBN do livro selecionado para exibição no modal

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute,private authservice: AuthService) { }

  ngOnInit(): void {
      this.loadAllBooks();
    
  }

  // Método para carregar todos os livros
  loadAllBooks(): void {
    this.isLoading = true;
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar livros:', err);
        this.errorMessage = 'Erro ao carregar livros. Tente novamente mais tarde.';
        this.isLoading = false;
      },
    });
  }


  openModal(isbn: string): void {
    console.log('📖 Livro clicado, navegando para /book/' + isbn);
    if(this.authservice.userSubject.value?.role=='client'){
    this.router.navigate(['/client/book/all', isbn]); // Navega para /book/:isbn
    }
  }
  
  
  closeModal(): void {
    this.selectedBookIsbn = null;
  }
  
}