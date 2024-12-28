import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import {
  ArcElement,
  BarController,
  ChartConfiguration,
  LineController,
  LineElement,
  PieController,
  PointElement
} from 'chart.js';
import { NgIf } from '@angular/common';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  PieController,
  LineController,
  ArcElement,
  PointElement,
  LineElement
);

@Component({
  selector: 'app-statistics',
  imports: [
    RouterLink,
    RouterLinkActive,
    BaseChartDirective,
    NgIf,
  ],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  openSidebar: boolean = false;

  toggleSidebar(): void {
    this.openSidebar = !this.openSidebar;
    if (!this.openSidebar) {
      this.close.emit();
    }
  }

  // Chart configurations
  taskPriorityChart: ChartConfiguration['data'] | undefined = undefined;
  taskStatusChart: ChartConfiguration['data'] | undefined = undefined;
  taskCategoryChart: ChartConfiguration['data'] | undefined = undefined;
  taskTimeChart: ChartConfiguration['data'] | undefined = undefined;

  // Statistics variables
  totalTasks = 0;
  totalCategories = 0;
  todoTasks = 0;
  doingTasks = 0;
  doneTasks = 0;
  overdueTasks = 0;
  tasksThisMonth = 0;
  tasksThisYear = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.http.get<any[]>('http://localhost:3000/tasks').subscribe((tasks) => {
      if (tasks) {
        this.totalTasks = tasks.length;
        this.todoTasks = tasks.filter(task => task.status === 'ToDo').length;
        this.doingTasks = tasks.filter(task => task.status === 'Doing').length;
        this.doneTasks = tasks.filter(task => task.status === 'Done').length;
        this.overdueTasks = tasks.filter(task => new Date(task.dueDate) < new Date()).length;

        const now = new Date();
        this.tasksThisMonth = tasks.filter(task => new Date(task.createdAt).getMonth() === now.getMonth()).length;
        this.tasksThisYear = tasks.filter(task => new Date(task.createdAt).getFullYear() === now.getFullYear()).length;

        this.createTaskPriorityChart(tasks);
        this.createTaskStatusChart(tasks);
        this.createTaskTimeChart(tasks);
      }
    }, (error) => {
      console.error('Error fetching tasks:', error);
    });

    this.http.get<any[]>('http://localhost:3000/categories').subscribe((categories) => {
      if (categories) {
        this.totalCategories = categories.length;
        this.createTaskCategoryChart(categories);
      }
    }, (error) => {
      console.error('Error fetching categories:', error);
    });
  }

  createTaskPriorityChart(tasks: any[]): void {
    const priorityCounts = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {});

    this.taskPriorityChart = {
      labels: Object.keys(priorityCounts),
      datasets: [
        {
          label: 'Task Priorities',
          data: Object.values(priorityCounts),
          backgroundColor: ['#007ea7', '#47afc8', '#219ebc', '#f94144', '#f0b42a'],
        },
      ],
    };
  }

  createTaskStatusChart(tasks: any[]): void {
    this.taskStatusChart = {
      labels: ['To Do', 'Doing', 'Done', 'Overdue'],
      datasets: [
        {
          label: 'Task Statuses',
          data: [this.todoTasks, this.doingTasks, this.doneTasks, this.overdueTasks],
          backgroundColor: ['#5B85F0', '#FCD512', '#6AEA5C', '#EB5B5B'],
        },
      ],
    };
  }

  createTaskCategoryChart(categories: any[]): void {
    this.http.get<any[]>('http://localhost:3000/tasks').subscribe((tasks) => {
      if (tasks) {
        const categoryCounts = categories.map(category => ({
          name: category.name,
          value: tasks.filter(task => task.categoryId === category.id).length,
        }));

        this.taskCategoryChart = {
          labels: categoryCounts.map(c => c.name),
          datasets: [
            {
              label: 'Tasks by Category',
              data: categoryCounts.map(c => c.value),
              backgroundColor: ['#90be6d', '#43aa8b', '#f9c74f', '#f3722c'],
            },
          ],
        };
      }
    }, (error) => {
      console.error('Error fetching tasks for categories:', error);
    });
  }

  createTaskTimeChart(tasks: any[]): void {
    const months = Array(12).fill(0);
    tasks.forEach(task => {
      const month = new Date(task.dueDate).getMonth();
      months[month]++;
    });

    this.taskTimeChart = {
      labels: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ],
      datasets: [
        {
          label: 'Tasks This Year',
          data: months,
          backgroundColor: '#219ebc',
          borderColor: '#007ea7',
          borderWidth: 1,
        },
      ],
    };
  }

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
}
