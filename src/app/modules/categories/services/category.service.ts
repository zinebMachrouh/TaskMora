import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/categories';

  constructor(private http :HttpClient) { }

  getAllCategories(){
    return this.http.get<Category[]>(this.baseUrl);
  }

  addCategory(category: Category){
    return this.http.post<Category>(this.baseUrl, category);
  }

  updateCategory(categoryId: string, updatedCategory: Category){
    return this.http.put<Category>(`${this.baseUrl}/${categoryId}`, updatedCategory);
  }

  deleteCategory(categoryId: string){
    return this.http.delete<any>(`${this.baseUrl}/${categoryId}`);
  }

  getCategoryById(categoryId: string){
    return this.http.get<Category>(`${this.baseUrl}/${categoryId}`);
  }
}
