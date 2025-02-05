import { Component } from '@angular/core';
import { Book } from '../../Models/book';
import { BookService } from '../../Services/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [NgIf],
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.css'
})
export class DeleteBookComponent {
  book : Book | null = null;
  errorMessage='';
  successMessage='';
  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const isbn = params['isbn'];
      if (isbn) {
        if (confirm(`Tem certeza que deseja remover o livro com ISBN ${isbn}?`)) {
          this.bookService.deleteBook(isbn).subscribe({
            next: () => {
              this.successMessage = `Livro com ISBN ${isbn} removido com sucesso.`;
              // setTimeout(() => this.router.navigate(['/books']), 2000); // Redireciona após 2 segundos
            },
            error: (err) => {
              console.error('Erro ao remover o livro:', err);
              this.errorMessage = 'Erro ao remover o livro. Tente novamente mais tarde.';
            }
          });
        } else {
          // this.router.navigate(['/books']); // Se o usuário cancelar
        }
      }
    });
  }
}
