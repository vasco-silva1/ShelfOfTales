import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../Models/book';
import { BookService } from '../../Services/book.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {  NgIf } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { CurrencyPipe } from '../../Pipes/currency.pipe';



@Component({
  selector: 'app-get-book',
  standalone: true,
  imports: [NgIf, CurrencyPipe,RouterModule],
  templateUrl: './get-book.component.html',
  styleUrls: ['./get-book.component.css']
})
export class GetBookComponent implements OnInit {
  book: Book | null = null;
  errorMessage = '';



  constructor(private bookService: BookService, private route: ActivatedRoute, private router : Router,private authservice:AuthService) {}

  ngOnInit(): void {
    // ✅ Listen to route changes so ISBN updates dynamically
    this.route.paramMap.subscribe((params) => {
      const isbn = params.get('isbn');
      console.log('🔎 ISBN da rota:', isbn);
      if (isbn) {
        this.loadBook(isbn);
      }
    });
  }

  public isManager()  : boolean {
    return this.authservice.hasRole('manager')
  }

  public isClient()  : boolean {
    return this.authservice.hasRole('client')
  }
  

  // Método para carregar os detalhes do livro
  private loadBook(isbn: string): void {
    console.log('📚 Carregando livro com ISBN:', isbn);
    this.bookService.getBookByIsbn(isbn).subscribe({
      next: (result) => {
        this.book = result;
        console.log('✅ Livro carregado:', this.book); // 📌 Verifica se o livro foi carregado
      },
      error: (err) => {
        console.error('❌ Erro ao carregar o livro:', err);
        this.errorMessage = 'Erro ao carregar o livro.';
      },
    });
  }

  closeModal(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  goToDeleteBook(): void {
    if (!this.book) return;
    this.router.navigate(['delete'], { relativeTo: this.route });
  }

  updateBook(): void {
    if (!this.book) return;
    this.router.navigate(['update'], { relativeTo: this.route });
  }

  viewReviews(): void {
    if (!this.book) return;
    this.router.navigate(['review'], { relativeTo: this.route });
  }

  createReview(): void {
    if (!this.book) return;
    this.router.navigate(['review/write'], { relativeTo: this.route });
  }
  
  patchBook(): void {
    if (!this.book) return;
    this.router.navigate([`/manager/book/available/${this.book?.isbn}/availability`]);
  }
  
}


