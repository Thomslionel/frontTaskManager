import { Component, OnInit, signal } from '@angular/core'; // 1. Importe signal
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategorieModel } from '../../models/serviceModel';
import { CategoriesService } from '../../services/Categories/categories-service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss']
})
export class Categories implements OnInit {

  // 2. Transforme tes variables en signals
  categories = signal<CategorieModel[]>([]);
  newCategoryName = '';
  loading = signal<boolean>(false);

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.loading.set(true); // Mettre à jour un signal

    this.categoriesService.getUserCategories().subscribe({
      next: (response) => {
        // On met à jour le signal avec les données reçues
        this.categories.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  createCategory() {
    if (!this.newCategoryName.trim()) return;

    const category = { name: this.newCategoryName };

    this.categoriesService.createCategory(category).subscribe({
      next: (res) => {
        this.newCategoryName = '';
        this.loadCategories(); // Recharger proprement
      },
      error: (err) => console.error(err)
    });
  }

  deleteCategory(id: number) {
    this.categoriesService.deleteCategory(id).subscribe({
      next: () => {
        this.loadCategories(); // Recharger proprement
      },
      error: (err) => console.error(err)
    });
  }
}