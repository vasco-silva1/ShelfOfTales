import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  book? : Book

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.isbn = params['isbn'];
      console.log('📚 ISBN recebido:', this.isbn); // 🔍 Debug para verificar o ISBN
      if (!this.isbn) {
        console.error('❌ Nenhum ISBN recebido!');
        this.message = 'Erro: Nenhum ISBN fornecido.';
        return;
      }
      this.bookForm = this.fb.group({
        title: ['', Validators.required],
        author: ['', Validators.required],
        category: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
        cover: ['', Validators.required]
      });
  
      // Aguarda a resposta da API e preenche o formulário
      this.bookService.getBookByIsbn(this.isbn).subscribe({
        next: (book) => {
          console.log('📚 Livro carregado:', book); // 🔍 DEBUG: Veja se os dados estão chegando
  
          if (!book) {
            console.error('❌ Livro não encontrado.');
            this.message = 'Erro ao carregar os dados do livro.';
            return;
          }
  
          this.bookForm.patchValue({
            title: book.title ?? '',
            author: book.author?.join(', ') ?? '',
            category: book.category ?? '',
            price: book.price ?? 0,
            cover: book.cover ?? ''
          });
  
          this.book = book; // ✅ Agora "book" está sendo definido corretamente
        },
        error: (err) => {
          console.error('❌ Erro ao carregar o livro:', err);
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
        setTimeout(() => this.closeModal(), 1500); // Fecha o modal após sucesso
      },
      error: (err) => {
        console.error('Erro ao atualizar o livro:', err);
        this.message = 'Erro ao atualizar o livro.';
      }
    });
  
  }
  closeModal(): void {
    this.router.navigate([`/book/available/${this.isbn}`]); // ✅ Fecha o modal e volta para a página do livro
  }
  
}
