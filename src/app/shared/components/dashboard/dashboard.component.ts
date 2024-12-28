import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { TaskListComponent } from '../../../modules/tasks/components/task-list/task-list.component';
import { StatsComponent } from '../../../modules/dashboard/components/stats/stats.component';
import { CategoryListComponent } from '../../../modules/categories/components/category-list/category-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    TaskListComponent,
    StatsComponent,
    CategoryListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  openSidebar: boolean = false;

  toggleSidebar(): void {
    this.openSidebar = !this.openSidebar;
    if (!this.openSidebar) {
      this.close.emit();
    }
  }
}
