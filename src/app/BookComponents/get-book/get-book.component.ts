import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../Models/book';
import { BookService } from '../../Services/book.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';
import { ListreviewComponent } from '../../ReviewComponents/listreview/listreview.component';

// @Component({
//   selector: 'app-get-book',
//   standalone: true,
//   imports: [NgIf,CurrencyPipe],
//   templateUrl: './get-book.component.html',
//   styleUrl: './get-book.component.css'
// })
// export class GetBookComponent {
  
//   book : Book | null = null;
//   errorMessage='';
  
//   constructor(private bookService: BookService, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     // Pegando o parâmetro diretamente do `params` e fazendo a requisição
//     this.route.params.subscribe((params) => {
//       const isbn = params['isbn']; // Pega o parâmetro `isbn` da URL
//       if (isbn) {
//         this.bookService.getBookByIsbn(isbn).subscribe({
//           next: (result) => (this.book = result),
//           error: (err) => {
//             console.error(err);
//             this.errorMessage = 'Erro ao carregar o livro.';
//           },
//         });
//       }
//     });}
//     }

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
  @Input() isbn: string | null = null;


  constructor(private bookService: BookService, private route: ActivatedRoute, private router : Router) {}

  ngOnInit(): void {
    // const isbn = this.route.snapshot.params['isbn']; // Obtém ISBN da URL
    console.log('🔎 ISBN da rota:', this.isbn);
    if (this.isbn) {
      this.loadBook(this.isbn);
    }
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
    this.router.navigate(['/books/available']); // ✅ Fecha o modal voltando para a Home
  }

    // Agora o botão apenas redireciona para a tela de exclusão
    goToDeleteBook(): void {
      if (!this.book) return;
      this.router.navigate([`/book/available/${this.book.isbn}/delete`]);
    }
  
    // Redireciona para a página de edição do livro
    updateBook(): void {
      if (!this.book) return;
      this.router.navigate([`/book/available/${this.book.isbn}/update`]);
    }
  
    // Redireciona para a página de avaliações do livro
    viewReviews(): void {
      if (!this.book) return;
      this.router.navigate([`/book/available/${this.book.isbn}/review`]);
    }
  
}


