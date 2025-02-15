import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../Models/category';
import { CategoryService } from '../../Services/category.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FocusDirective } from '../../Directives/focus.directive';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [FormsModule,NgIf,FocusDirective],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  newCategory: Category = { name: '' }; // Initialize empty category
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private categoryService: CategoryService, private router: Router) { }

  createCategory(): void {
    if (!this.newCategory.name.trim()) {
      this.errorMessage = 'Category name cannot be empty!';
      return;
    }

    this.categoryService.createCategory(this.newCategory).subscribe({
      next: () => {
        this.successMessage = 'Category created successfully!';
        this.errorMessage = null;
        setTimeout(() => {
          this.router.navigate(['/category']); // Redirect to category list
        }, 2000);
      },
      error: (err) => {
        console.error('Error creating category:', err);
        this.errorMessage = 'Error creating category. Please try again.';
      }
    });
  }
}

