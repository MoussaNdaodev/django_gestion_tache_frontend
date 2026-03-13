import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  // private baseUrl = 'https://moussandao.pythonanywhere.com/api/';
  private baseUrl = 'http://localhost:8000/api';

  public get<T>(endPoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endPoint}`);
  }

  public post<T>(endPoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endPoint}`, data);
  }

  public update<T>(endPoint: string, id: number, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endPoint}/${id}/`, data);
  }

  public delete<T>(endPoint: string, id: number): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endPoint}/${id}/`);
  }

  public getById<T>(endPoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endPoint}/${id}/`);
  }

  public patch<T>(endPoint: string, data: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${endPoint}`, data);
  }
}
