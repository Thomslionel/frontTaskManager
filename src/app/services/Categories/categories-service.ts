import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorieModel } from '../../models/serviceModel';
import { ApiResponse } from '../../models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {


  private apiUrl = 'https://backendtaskmanager-y50s.onrender.com/categorie';

  constructor(private http: HttpClient) {}

  // =========================
  // 📥 GET ALL CATEGORIES
  // =========================
  getAllCategories(): Observable<CategorieModel[]> {
    return this.http.get<CategorieModel[]>(this.apiUrl);
  }

  // =========================
  // 📥 GET CATEGORY BY ID
  // =========================
  getCategoryById(id: number): Observable<CategorieModel> {
    return this.http.get<CategorieModel>(`${this.apiUrl}/${id}`);
  }
  // =========================
  // 📥 GET USER CATEGORIES
  // GET /findAll
  // =========================
  getUserCategories(): Observable<ApiResponse<CategorieModel[]>> {
  return this.http.get<ApiResponse<CategorieModel[]>>(
    `${this.apiUrl}/findAll`
  );
}

  // =========================
  // ➕ CREATE CATEGORY
  // =========================
  createCategory(category: any): Observable<any> {
    return this.http.post<CategorieModel>(this.apiUrl, category);
  }

  // =========================
  // ✏️ UPDATE CATEGORY
  // =========================
  updateCategory(id: number, category: CategorieModel): Observable<CategorieModel> {
    return this.http.put<CategorieModel>(`${this.apiUrl}/${id}`, category);
  }

  // =========================
  // ❌ DELETE CATEGORY
  // =========================
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
