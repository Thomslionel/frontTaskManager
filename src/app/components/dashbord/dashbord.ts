import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/AuthService/auth';



import { DashboardService } from '../../services/DashBoardService/dashboard-service';
import { Categories } from "../categories/categories";
import { Taches } from "../taches/taches";

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.html',
  styleUrl: './dashbord.scss',
  imports: [Categories, Taches,],
})
export class Dashbord implements OnInit {

  selectedPage = 'dashboard';
  userName = '';

  // =====================
  // STATS
  // =====================
  totalTasks = 0;
  totalCategories = 0;

  doneTasks = 0;
  todoTasks = 0;
  inProgressTasks = 0;

  loading = true;

  currentYear: number = new Date().getFullYear();

  constructor(
    private authService: Auth,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  

  // =====================
  // INIT
  // =====================
  ngOnInit() {
    const user = this.authService.getUserFromToken();
    if (user) this.userName = user.username;

    this.loadDashboard();
  }

  // =====================
  // LOAD DATA
  // =====================
  loadDashboard() {
    this.loading = true;

    this.dashboardService.getDashboardStats().subscribe({
      next: (stats) => {

        this.totalTasks = stats.totalTasks;
        this.totalCategories = stats.totalCategories;

        this.doneTasks = stats.doneTasks;
        this.todoTasks = stats.todoTasks;
        this.inProgressTasks = stats.inProgressTasks;



        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // =====================
  // UI
  // =====================
  get pageTitle() {
    switch (this.selectedPage) {
      case 'categories':
        return 'Gestion des catégories';
      case 'tasks':
        return 'Gestion des tâches';
      default:
        return 'Dashboard';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}