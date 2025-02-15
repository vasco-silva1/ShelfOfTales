import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/book';
import { NgFor, NgIf } from '@angular/common';
import { GetBookComponent } from '../get-book/get-book.component';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

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


  constructor(private bookService: BookService, private route: ActivatedRoute,private router:Router, private authservice : AuthService) {}

  ngOnInit(): void {
    this.loadAvailableBooks(); // Carrega os livros disponíveis ao iniciar o componente
  }



  loadAvailableBooks(): void {
    this.bookService.getAvailableBooks().subscribe({
      next: (data) => {
        console.log(data)
        this.books = data; // ✅ Ensures only available books are stored
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error fetching available books:', err);
        this.errorMessage = 'Error loading books.';
        this.isLoading = false;
      }
    });
  }

  public isClient() : boolean{
    return this.authservice.hasRole('client')
  }
  public isManager() : boolean{
    return this.authservice.hasRole('manager')
  }
  public isAuth() :boolean{
    return this.authservice.isAuth()
  }

  openBook(isbn: string): void {
    console.log('📖 Livro clicado, ISBN:', isbn); // ✅ Confirma que o ISBN está correto
    if (this.isClient()) {
      this.router.navigate([`/client/book/available/${isbn}`]);
    } else if (this.isManager()) {
      this.router.navigate([`/manager/book/available/${isbn}`]);
    } else {
      this.router.navigate([`/book/available/${isbn}`]);
    }
  }
  
  

  back(){
     this.router.navigate([''])
  }
  // back(): void {
  //   window.history.back(); // ✅ Goes to the previous page
  // }
}
