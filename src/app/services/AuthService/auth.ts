import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = "https://backendtaskmanager-y50s.onrender.com/auth";

  constructor(private http : HttpClient){}

  login(data : {email: string, password: string}) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
      tap (res => {
        this.storeTokens(res);
      })
    )
  }


   register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }


  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();

    return this.http.post<any>(`http://localhost:3000/refresh`, {
      refreshToken
    }).pipe(
      tap(res => {
        // on met seulement le nouveau access token
        this.storeTokens(res);
      })
    );
  }


   logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }



  private storeTokens(res: any): void {
    if (res.accessToken) {
      localStorage.setItem('accessToken', res.accessToken);
    }

    if (res.refreshToken) {
      localStorage.setItem('refreshToken', res.refreshToken);
    }
  }




   getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }


   isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }



  getUserFromToken(): any {
  const token = this.getAccessToken();

  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    return null;
  }
}

  
}
