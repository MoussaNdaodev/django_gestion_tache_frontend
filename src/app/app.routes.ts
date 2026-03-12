import { PageStatistiquesComponent } from './pages/page-statistiques-component/page-statistiques-component';
import { PageMesTachesComponent } from './pages/page-mes-taches-component/page-mes-taches-component';
import { PageCreationTacheProjetComponent } from './pages/page-creation-tache-projet-component/page-creation-tache-projet-component';
import { PageCreationEquipeProjetComponent } from './pages/page-creation-equipe-projet-component/page-creation-equipe-projet-component';
import { Routes } from '@angular/router';
import { authGuardGuard } from './core/guards/auth-guard-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/main-component/main-component').then((m) => m.MainComponent),
    children: [
      { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
      {
        path: 'acceuil',
        loadComponent: () =>
          import('./pages/page-acceuil-component/page-acceuil-component').then(
            (m) => m.PageAcceuilComponent,
          ),
        canActivate: [authGuardGuard],
      },
      {
        path: 'profil',
        loadComponent: () =>
          import('./pages/page-profil-component/page-profil-component').then(
            (m) => m.PageProfilComponent,
          ),
        canActivate: [authGuardGuard],
      },
      {
        path: 'projets',
        loadComponent: () =>
          import('./pages/page-projets-component/page-projets-component').then(
            (m) => m.PageProjetsComponent,
          ),
        canActivate: [authGuardGuard],
      },
      {
        path: 'projets/creation',
        loadComponent: () =>
          import('./pages/page-creation-projet/page-creation-projet').then(
            (m) => m.PageCreationProjet,
          ),
        canActivate: [authGuardGuard],
      },
      {
        path: 'projets/:id',
        loadComponent: () =>
          import('./pages/page-detail-projet-component/page-detail-projet-component').then(
            (m) => m.PageDetailProjetComponent,
          ),
        canActivate: [authGuardGuard],
      },
      {
        path: 'projets/:id/equipe/creation',
        loadComponent: () =>
          import('./pages/page-creation-equipe-projet-component/page-creation-equipe-projet-component').then(
            (m) => m.PageCreationEquipeProjetComponent,
          ),
        canActivate: [authGuardGuard],
      },
      {
        path: 'projets/:id/tache/creation',
        loadComponent: () =>
          import('./pages/page-creation-tache-projet-component/page-creation-tache-projet-component').then(
            (m) => m.PageCreationTacheProjetComponent,
          ),
        canActivate: [authGuardGuard],
      },
      {
        path: 'mestaches',
        loadComponent: () =>
          import('./pages/page-mes-taches-component/page-mes-taches-component').then(
            (m) => m.PageMesTachesComponent,
          ),
        canActivate: [authGuardGuard],
      },
      {
        path: 'statistiques',
        loadComponent: () =>
          import('./pages/page-statistiques-component/page-statistiques-component').then(
            (m) => m.PageStatistiquesComponent,
          ),
        canActivate: [authGuardGuard],
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./shared/components/auth-component/auth-component').then((m) => m.AuthComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/page-login-component/page-login-component').then(
            (m) => m.PageLoginComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/page-register-component/page-register-component').then(
            (m) => m.PageRegisterComponent,
          ),
      },
    ],
  },
];
