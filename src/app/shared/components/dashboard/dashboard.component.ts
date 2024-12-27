import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {TaskListComponent} from '../../../modules/tasks/components/task-list/task-list.component';
import {StatsComponent} from '../../../modules/dashboard/components/stats/stats.component';
import {CategoryListComponent} from '../../../modules/categories/components/category-list/category-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    TaskListComponent,
    StatsComponent,
    CategoryListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
