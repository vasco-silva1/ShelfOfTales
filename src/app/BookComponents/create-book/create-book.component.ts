import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../Services/book.service';
import { Router } from '@angular/router';
import { Book } from '../../Models/book';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
})
export class CreateBookComponent {
  bookForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(10)]],
      title: ['', Validators.required],
      author: this.fb.array([this.fb.control('')], Validators.required), // Lista de autores
      category: ['', Validators.required],
      cover: [''], // Opcional
      price: [0, [Validators.required, Validators.min(0)]], // O preço não pode ser negativo
      available: [true], // Padrão: disponível
    });
  }

  // Métodos para manipular a lista de autores
  get authors(): FormArray {
    return this.bookForm.get('author') as FormArray;
  }

  addAuthor(): void {
    this.authors.push(this.fb.control('', Validators.required)); // Garante que o campo seja obrigatório
  }
  

  removeAuthor(index: number): void {
    if (this.authors.length > 1) {
      this.authors.removeAt(index);
    }
  }

  // Método para enviar o formulário
  createBook(): void {
    if (this.bookForm.invalid) {
      return;
    }
  
    this.isSubmitting = true;
  
    // Obtém os dados do formulário
    const newBook: Book = this.bookForm.value;
  
    // Remove autores vazios do array
    const formattedBook = {
      ...newBook,
      author: newBook.author.filter((author: string) => author.trim() !== ''), // Filtra autores não vazios
    };
  
    console.log('Novo livro formatado:', formattedBook); // 👀 Verifique o payload antes de enviar
  
    this.bookService.createBook(formattedBook).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/book']); // Redireciona após sucesso
      },
      error: (err) => {
        console.error('Erro ao criar livro:', err);
        this.errorMessage = 'Erro ao criar livro. Verifique os campos e tente novamente.';
        this.isSubmitting = false;
      },
    });
  }


  
  
}
