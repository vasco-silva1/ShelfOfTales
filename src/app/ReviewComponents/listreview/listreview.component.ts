import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { GetReview } from '../../Models/get-review';
import { ReviewService } from '../../Services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-listreview',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './listreview.component.html',
  styleUrl: './listreview.component.css'
})
export class ListreviewComponent implements OnInit {
  isbn!: string;
  reviews: GetReview[] = [];
  errorMessage: string | null = null;
  isModalOpen = false;

  constructor(private reviewService: ReviewService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.isbn = this.route.snapshot.parent?.params['isbn']; // ✅ Pegamos o ISBN da rota pai
    this.loadReviews();
    this.isModalOpen = true; // ✅ Garante que o modal abra automaticamente
  }

  loadReviews(): void {
    this.reviewService.getAllReviews(this.isbn).subscribe({
      next: (data) => this.reviews = data,
      error: () => this.errorMessage = 'Erro ao carregar avaliações.'
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.router.navigate(['..'], { relativeTo: this.route }); // ✅ Fecha o modal voltando para `/book/:isbn`
  }
}