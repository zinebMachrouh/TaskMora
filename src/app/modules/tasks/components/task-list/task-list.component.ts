import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import {CategoryService} from '../../../categories/services/category.service';
import {Category} from '../../../categories/models/task.model';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  searchControl = new FormControl('');
  originalTasks: Task[] = [];

  constructor(private taskService: TaskService, private categoryService : CategoryService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.searchTasks(value || '');
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.originalTasks = tasks;

        console.log('Tasks loaded:', this.tasks);
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      },
    });
  }

  deleteTask(taskId: string): void {
    const confirmed = confirm('Are you sure you want to delete this task?');

    if (confirmed) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          console.log(`Task ${taskId} deleted.`);
          this.loadTasks();
        },
        error: (err) => {
          console.error('Error deleting task:', err);
        },
      });
    }
  }

  getTasksByStatus(status: 'ToDo' | 'Doing' | 'Done'): Task[] {
    return this.tasks
      .filter(task => task.status === status)
      .sort((a, b) => this.getPriorityValue(a.priority) - this.getPriorityValue(b.priority));
  }

  private getPriorityValue(priority: 'High' | 'Medium' | 'Low'): number {
    return priority === 'High' ? 1 : priority === 'Medium' ? 2 : 3;
  }

  getCategoryName(categoryId: string): string {
    return this.categories.find(c => c.id === categoryId)?.name || '';
  }

  searchTasks(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.tasks = [...this.originalTasks];
      return;
    }

    const term = searchTerm.toLowerCase();
    this.tasks = this.originalTasks.filter(task =>
      task.title.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term)
    );
  }
}
