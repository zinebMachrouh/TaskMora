import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskListComponent} from './modules/tasks/components/task-list/task-list.component';
import {TaskFormComponent} from './modules/tasks/components/task-form/task-form.component';
import {StatsComponent} from './modules/dashboard/components/stats/stats.component';
import {CategoryListComponent} from './modules/categories/components/category-list/category-list.component';
import {DashboardComponent} from './shared/components/dashboard/dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'dashboard', component: DashboardComponent},
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/create', component: TaskFormComponent },
  { path: 'tasks/edit/:id', component: TaskFormComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'categories', component: CategoryListComponent }
];


