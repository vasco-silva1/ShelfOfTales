import { Component } from '@angular/core';
import { Book } from '../../Models/book';
import { BookService } from '../../Services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      const isbn = params['isbn'];
      if (isbn) {
        this.loadBook(isbn); // Busca o livro antes de excluir
      }
    });
  }

  private loadBook(isbn: string): void {
    this.bookService.getBookByIsbn(isbn).subscribe({
      next: (book) => {
        this.book = book;
      },
      error: () => {
        this.errorMessage = 'Livro não encontrado ou já removido.';
      }
    });
  }

  deleteBook(): void {
    if (!this.book) return;

    const confirmDelete = confirm(`Tem certeza que deseja remover o livro "${this.book.title}"?`);
    if (confirmDelete) {
      this.bookService.deleteBook(this.book.isbn).subscribe({
        next: () => {
          this.successMessage = `Livro "${this.book?.title}" removido com sucesso.`;
          setTimeout(() => this.router.navigate(['../../'],{ relativeTo: this.route }), 2000); // Sobe dois niveis na hierarquia apos 2 seg
        },
        error: (err) => {
          console.error('Erro ao remover o livro:', err);
          this.errorMessage = 'Erro ao remover o livro. Tente novamente mais tarde.';
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }



}
