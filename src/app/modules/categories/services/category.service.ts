import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/task.model';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/categories';
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllCategories(): void {
    this.http.get<Category[]>(this.baseUrl).subscribe({
      next: (categories) => {
        this.categoriesSubject.next(categories);
        console.log('Categories:', categories);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  addCategory(category: { name: string }) {
    return this.http.post<Category>(this.baseUrl, category).pipe(
      tap(() => {
        this.getAllCategories();
      })
    );
  }

  updateCategory(categoryId: string, updatedCategory: Category) {
    return this.http.put<Category>(`${this.baseUrl}/${categoryId}`, updatedCategory).pipe(
      tap(() => {
        this.getAllCategories();
      })
    );
  }

  deleteCategory(categoryId: string) {
    return this.http.delete<any>(`${this.baseUrl}/${categoryId}`).pipe(
      tap(() => {
        this.getAllCategories();
      })
    );
  }

  getCategoryById(categoryId: string) {
    return this.http.get<Category>(`${this.baseUrl}/${categoryId}`);
  }
}
