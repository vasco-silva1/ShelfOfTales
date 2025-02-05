import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../Services/book.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-availability',
  standalone: true,
  imports: [NgIf],
  templateUrl: './update-availability.component.html',
  styleUrl: './update-availability.component.css'
})
export class UpdateAvailabilityComponent implements OnInit {
  isbn: string = '';
  message = '';
  errorMessage = '';
  isAvailable: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtém o ISBN da rota
    this.isbn = this.route.snapshot.paramMap.get('isbn') || '';
    if (!this.isbn) {
      this.errorMessage = 'ISBN inválido!';
    }
  }

  updateAvailability(available: boolean): void {
    if (!this.isbn) {
      this.errorMessage = 'ISBN inválido!';
      return;
    }

    this.bookService.updateBookAvailability(this.isbn, available).subscribe({
      next: () => {
        this.message = `Disponibilidade atualizada para: ${available ? 'Disponível' : 'Indisponível'}`;
        // setTimeout(() => this.router.navigate(['/books']), 2000);
      },
      error: (err) => {
        console.error('Erro ao atualizar disponibilidade:', err);
        this.errorMessage = 'Erro ao atualizar disponibilidade. Tente novamente.';
      }
    });
  }
}