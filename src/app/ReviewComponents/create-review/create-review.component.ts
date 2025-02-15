import { Component, Input } from '@angular/core';
import { ReviewService } from '../../Services/review.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.css'
})
export class CreateReviewComponent {
  isbn!: string; 
  reviewText: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private reviewService: ReviewService, public router: Router, public route :ActivatedRoute) { }

  submitReview(): void {
    if (!this.reviewText.trim()) {
      this.errorMessage = 'Review cannot be empty!';
      return;
    }

    this.route.parent?.params.subscribe(params =>  this.isbn = params['isbn'] );
    console.log("parent",this.isbn)
    const SendReview = {
      isbn: this.isbn,
      review : this.reviewText
    }

    console.log(SendReview);
    this.reviewService.createReview(SendReview).subscribe({
      next: () => {
        this.successMessage = 'Review submitted successfully!';
        this.errorMessage = null;
        setTimeout(() => {
          this.router.navigate(['../'], { relativeTo: this.route }); // Go one level up
        }, 2000);
      },
      error: (err) => {
        console.error('Error submitting review:', err);
        this.errorMessage = 'Failed to submit review. Please try again.';
      }
    });
  }
}

