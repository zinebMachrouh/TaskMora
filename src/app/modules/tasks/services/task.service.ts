import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  addTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  updateTask(taskId: string, updatedTask: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${taskId}`, updatedTask);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${taskId}`);
  }
}
