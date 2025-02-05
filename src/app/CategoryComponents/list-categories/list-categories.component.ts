import { Component } from '@angular/core';
import { Category } from '../../Models/category';
import { CategoryService } from '../../Services/category.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.css'
})
export class ListCategoriesComponent {
  categories: Category[] = []; // Lista de categorias
  errorMessage: string | null = null;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erro ao carregar categorias:', err);
        this.errorMessage = 'Não foi possível carregar as categorias.';
      }
    });
  }
}
