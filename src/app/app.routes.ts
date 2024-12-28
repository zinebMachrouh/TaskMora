import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './shared/components/dashboard/dashboard.component';
import {StatisticsComponent} from './modules/dashboard/components/statistics/statistics.component';


export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'dashboard', component: DashboardComponent},
  { path: 'statistics', component: StatisticsComponent },
];


