import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { CategoriesService } from '../Categories/categories-service';
import { TacheService } from '../TacheService/tache-service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {


  constructor(
    private taskService: TacheService,
    private categoryService: CategoriesService
  ) {}

  getDashboardStats(): Observable<any> {
    return forkJoin({
      tasks: this.taskService.getUserTasks(),
      categories: this.categoryService.getUserCategories(),
    }).pipe(
      map((result: any) => {
        const tasks = result.tasks.data ?? result.tasks;
        const categories = result.categories.data ?? result.categories;

        return {
          totalTasks: tasks.length,
          totalCategories: categories.length,

          // BONUS STATS
          doneTasks: tasks.filter((t: any) => t.status === 'DONE').length,
          todoTasks: tasks.filter((t: any) => t.status === 'TODO').length,
          inProgressTasks: tasks.filter((t: any) => t.status === 'IN_PROGRESS').length,
        };
      })
    );
  }
  
}
