import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../api/api-service';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';
  private apiService = inject(ApiService);
  private platformId = inject(PLATFORM_ID);

  // Vérifie si on est dans le navigateur (j'avais activer le SSR c'est à dire le rendu coté serveur
  // de ce fait on doir verifier d'abord si on est coté client (navigateur) pour ajouter de stockage de Session (local storage))
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public register(utilisateur: {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: 'etudiant' | 'professeur';
    avatar?: File;
  }) {
    const formData = new FormData();
    formData.append('nom', utilisateur.nom);
    formData.append('prenom', utilisateur.prenom);
    formData.append('email', utilisateur.email);
    formData.append('password', utilisateur.password);
    formData.append('role', utilisateur.role);
    if (utilisateur.avatar) {
      formData.append('avatar', utilisateur.avatar);
    }

    return this.apiService.post('/utilisateurs/register/', formData).pipe(
      tap((response: any) => {
        // si tu veux connecter automatiquement après inscription
        if (response && response.access && this.isBrowser()) {
          sessionStorage.setItem(this.tokenKey, response.access);
          if (response.user) {
            sessionStorage.setItem('user', JSON.stringify(response.user));
          }
          if (response.refresh) {
            sessionStorage.setItem('refresh', response.refresh);
          }
        }
      }),
    );
  }

  public login(credentials: { email: string; password: string }) {
    return this.apiService.post('/login/', credentials).pipe(
      tap((response: any) => {
        if (response && response.access && this.isBrowser()) {
          sessionStorage.setItem(this.tokenKey, response.access);

          if (response.user) {
            sessionStorage.setItem('user', JSON.stringify(response.user));
          }

          if (response.refresh) {
            sessionStorage.setItem('refresh', response.refresh);
          }
        }
      }),
    );
  }

  public refreshToken(): Observable<any> {
    if (!this.isBrowser()) return new Observable();

    const refresh = sessionStorage.getItem('refresh');
    return this.apiService.post<any>('/token/refresh/', { refresh });
  }

  public logout(): void {
    if (!this.isBrowser()) return;

    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('user');
  }

  public isLoggedIn(): boolean {
    if (!this.isBrowser()) return false;
    return !!sessionStorage.getItem(this.tokenKey);
  }

  public getUser(): any {
    if (!this.isBrowser()) return null;

    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserRole(): string | null {
    if (!this.isBrowser()) return null;

    const token = sessionStorage.getItem(this.tokenKey);
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  }
}
