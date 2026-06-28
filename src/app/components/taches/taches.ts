import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Task } from '../../models/tacheModel';
import { CategorieModel } from '../../models/serviceModel';

import { CategoriesService } from '../../services/Categories/categories-service';
import { TacheService } from '../../services/TacheService/tache-service';

@Component({
  selector: 'app-taches',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './taches.html',
  styleUrls: ['./taches.scss'],
})
export class Taches implements OnInit {

  // =========================
  // STATE
  // =========================
  tasks = signal<Task[]>([]);
  categories = signal<CategorieModel[]>([]);
  loading = signal<boolean>(false);
  
  // Contrôle l'affichage du formulaire extensible (Design Kanban)
  showForm: boolean = false;

  // =========================
  // FORM
  // =========================
  newTask: Partial<Task> = {
    title: '',
    description: '',
    status: 'TODO',
    priority: undefined,
    category_id: undefined,
    due_date: undefined,
    completed_at: undefined
  };

  constructor(
    private tacheService: TacheService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  // =========================
  // LOAD DATA
  // =========================
  loadInitialData() {
    this.loading.set(true);

    // TASKS
    this.tacheService.getUserTasks().subscribe({
      next: (res) => {
        this.tasks.set(res.data);

        console.log(res.data)
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });

    // CATEGORIES
    this.categoriesService.getUserCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      },
      error: (err) => console.error(err)
    });
  }

  // =========================
  // FILTRAGE DES TÂCHES (POUR LE KANBAN)
  // =========================
  // Cette méthode permet de filtrer rapidement les tâches par statut directement dans le template
  getTasksByStatus(status: Task['status']): Task[] {
    return this.tasks().filter(task => task.status === status);
  }

  // =========================
  // CREATE TASK
  // =========================
  createTask() {
    if (!this.newTask.title?.trim() ||
        !this.newTask.category_id ||
        !this.newTask.priority) {
      alert('Titre, catégorie et priorité obligatoires');
      return;
    }

    // auto completed logic
    if (this.newTask.status === 'DONE') {
      this.newTask.completed_at = new Date().toISOString();
    }

    this.loading.set(true);

    this.tacheService.createTask(this.newTask as Task).subscribe({
      next: () => {
        this.resetForm();
        this.showForm = false; // Replie automatiquement le formulaire après l'ajout
        this.loadInitialData();
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  // =========================
  // RESET FORM
  // =========================
  resetForm() {
    this.newTask = {
      title: '',
      description: '',
      status: 'TODO',
      priority: undefined,
      category_id: undefined,
      due_date: undefined,
      completed_at: undefined
    };
  }

  // =========================
  // DELETE TASK
  // =========================
  deleteTask(id: number | undefined) {
    if (!id) return;

    this.tacheService.deleteTask(id).subscribe({
      next: () => this.loadInitialData(),
      error: (err) => console.error(err)
    });
  }

  // =========================
  // STATUS UPDATE
  // =========================
  changeStatus(task: Task, status: Task['status']) {
    const updated: Task = {
      ...task,
      status,
      completed_at: status === 'DONE'
        ? new Date().toISOString()
        : undefined
    };

    this.tacheService.updateTask(task.id!, updated).subscribe({
      next: () => this.loadInitialData(),
      error: (err) => console.error(err)
    });
  }



  getCategoryName(categoryId: number | undefined): string {
  if (!categoryId) return 'Général';

  const foundCategory = this.categories().find(cat => cat.id == categoryId);
    console.log("Categorie " +foundCategory)
  return foundCategory ? foundCategory.name : 'Inconnue';
}
}