import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/tacheModel';
import { ApiResponse } from '../../models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class TacheService {


  private apiUrl = 'https://backendtaskmanager-y50s.onrender.com/task';

  constructor(private http: HttpClient) {}

  // =========================
  // ➕ CREATE TASK
  // POST /
  // =========================
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }



  // =========================
  // 📥 GET USER TASKS
  // GET /findAllTask
  // =========================
  getUserTasks(): Observable<ApiResponse<Task[]>> {
    return this.http.get<ApiResponse<Task[]>>(`${this.apiUrl}/findAllTask`);
  }

  // =========================
  // 📥 GET TASK BY ID
  // GET /:id
  // =========================
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  // =========================
  // ✏️ UPDATE TASK
  // PUT /:id
  // =========================
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  // =========================
  // ❌ DELETE TASK
  // DELETE /:id
  // =========================
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
