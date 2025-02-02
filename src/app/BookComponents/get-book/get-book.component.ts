import { Component } from '@angular/core';
import { Book } from '../../Models/book';
import { BookService } from '../../Services/book.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-get-book',
  standalone: true,
  imports: [NgIf,CurrencyPipe],
  templateUrl: './get-book.component.html',
  styleUrl: './get-book.component.css'
})
export class GetBookComponent {
  book : Book | null = null;
  errorMessage='';
  
  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Pegando o parâmetro diretamente do `params` e fazendo a requisição
    this.route.params.subscribe((params) => {
      const isbn = params['isbn']; // Pega o parâmetro `isbn` da URL
      if (isbn) {
        this.bookService.getBookByIsbn(isbn).subscribe({
          next: (result) => (this.book = result),
          error: (err) => {
            console.error(err);
            this.errorMessage = 'Erro ao carregar o livro.';
          },
        });
      }
    });}

    
    }

