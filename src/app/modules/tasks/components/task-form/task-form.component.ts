import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../categories/models/task.model';
import { Task } from '../../models/task.model';

// Custom validator to ensure the due date is today or in the future
function dueDateValidator(): any {
  return (control: any): { [key: string]: boolean } | null => {
    const dueDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      return { 'dueDateInvalid': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnChanges {
  @Input() categories: Category[] = [];
  @Input() isVisible = false;
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      categoryId: ['', Validators.required],
      priority: ['Medium', Validators.required],
      status: ['ToDo', Validators.required],
      dueDate: ['', [Validators.required, dueDateValidator()]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.save.emit(this.taskForm.value);
    }
  }
}
