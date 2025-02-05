import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../Models/book';
import { BookService } from '../../Services/book.service';


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

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isbn = this.route.snapshot.paramMap.get('isbn') || ''; // Obtém o ISBN da rota

    // Cria o formulário
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required], // Separados por vírgula
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      cover: ['', Validators.required]
    });

    // Carrega os dados do livro
    this.bookService.getBookByIsbn(this.isbn).subscribe((book) => {
      this.bookForm.setValue({
        title: book.title,
        author: book.author.join(', '),
        category: book.category,
        price: book.price,
        cover: book.cover
      });
    });
  }

  updateBook(): void {
    if (this.bookForm.invalid) {
      this.message = 'Preencha todos os campos corretamente.';
      return;
    }
  
    // Constrói o objeto com os campos esperados pelo servidor
    const book = {
      isbn: this.isbn,
      title: this.bookForm.value.title,
      author: this.bookForm.value.author.split(',').map((a: string) => a.trim()), // Converte para array
      cover: this.bookForm.value.cover,
      price: this.bookForm.value.price
    };
  
    console.log('Dados enviados para atualização:', book); // Log para verificação
  
    // Envia a requisição para atualizar o livro
    this.bookService.updateBook(this.isbn, book).subscribe({
      next: () => {
        this.message = 'Livro atualizado com sucesso!';
        // setTimeout(() => this.router.navigate(['/books']), 2000);
      },
      error: (err) => {
        console.error('Erro ao atualizar o livro:', err);
        this.message = 'Erro ao atualizar o livro. Verifique os dados enviados.';
      }
    });
  }
  
}
