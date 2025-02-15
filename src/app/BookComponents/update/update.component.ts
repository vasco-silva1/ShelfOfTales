
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/book';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  bookForm!: FormGroup;
  isbn!: string;
  message = '';
  book?: Book;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.isbn = params['isbn'];
      if (!this.isbn) {
        this.message = 'Erro: Nenhum ISBN fornecido.';
        return;
      }

      this.bookService.getBookByIsbn(this.isbn).subscribe({
        next: (book) => {
          if (!book) {
            this.message = 'Erro ao carregar os dados do livro.';
            return;
          }

          this.bookForm = this.fb.group({
            isbn: [{ value: this.isbn, disabled: true }],
            title: ['', Validators.required],
            author: ['', Validators.required],
            category: [{ value: book.category, disabled: true }],
            price: [0, [Validators.required, Validators.min(0)]],
            cover: ['', Validators.required],
            available: [true, Validators.required]
          });

          this.bookForm.setValue({
            isbn: book.isbn,
            title: book.title ?? '',
            author: book.author?.join(', ') ?? '',
            category: book.category ?? '',
            price: book.price ?? 0,
            cover: book.cover ?? '',
            available: book.available ?? true
          });

          this.book = book;
        },
        error: () => {
          this.message = 'Erro ao carregar os dados do livro.';
        }
      });
    });
  }

  updateBook(): void {
    if (this.bookForm.invalid) {
      this.message = 'Preencha todos os campos corretamente.';
      return;
    }

    const book = {
      isbn: this.isbn,
      title: this.bookForm.value.title,
      author: this.bookForm.value.author.split(',').map((a: string) => a.trim()),
      cover: this.bookForm.value.cover,
      price: Number(this.bookForm.value.price),
      available: this.bookForm.value.available === 'true' || this.bookForm.value.available === true
    };

    this.bookService.updateBook(this.isbn, book).subscribe({
      next: () => {
        this.message = 'Livro atualizado com sucesso!';
        setTimeout(() => this.closeModal(), 1500);
      },
      error: () => {
        this.message = 'Erro ao atualizar o livro. Verifique os campos obrigatórios.';
      }
    });
  }

  closeModal(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
