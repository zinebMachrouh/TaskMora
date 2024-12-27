import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/task.model';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  newCategory: string = '';
  selectedCategoryId: string | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (err: any) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  addCategory(): void {
    if (this.newCategory.trim()) {
      const trimmedCategoryName = this.newCategory.trim().toLowerCase();

      const isDuplicate = this.categories.some(
        (category) => category.name.toLowerCase() === trimmedCategoryName
      );

      if (isDuplicate) {
        console.error('Category already exists');
        return;
      }

      const newCategory: { name: string } = { name: this.newCategory.trim() };
      this.categoryService.addCategory(newCategory).subscribe({
        next: (category) => {
          this.categories.push(category);
          this.newCategory = '';
        },
        error: (err) => {
          console.error('Error adding category:', err);
        },
      });
    }
  }


  editCategory(category: Category): void {
    const trimmedCategoryName = category.name.trim().toLowerCase();

    const isDuplicate = this.categories.some(
      (cat) => cat.id !== category.id && cat.name.toLowerCase() === trimmedCategoryName
    );

    if (isDuplicate) {
      console.error('Category name already exists');
      return;
    }

    const updatedCategory: Category = { id: category.id, name: category.name.trim() };
    this.categoryService.updateCategory(category.id, updatedCategory).subscribe({
      next: () => {
        const existingCategory = this.categories.find((cat) => cat.id === category.id);
        if (existingCategory) {
          existingCategory.name = updatedCategory.name;
        }
      },
      error: (err) => {
        console.error('Error updating category:', err);
      },
    });
  }


  deleteCategory(categoryId: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          this.categories = this.categories.filter(cat => cat.id !== categoryId);
        },
        error: (err) => {
          console.error('Error deleting category:', err);
        },
      });
    }
  }
}
