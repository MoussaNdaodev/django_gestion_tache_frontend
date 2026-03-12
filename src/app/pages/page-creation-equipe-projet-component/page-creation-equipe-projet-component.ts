import { Utilisateur } from './../../core/models/utilisateur.model';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api/api-service';
import { Subscription } from 'rxjs';
import { Projet } from '../../core/models/projet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedResponse } from '../../core/models/PaginatedResponse';
import { Equipe } from '../../core/models/equipe.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-creation-equipe-projet-component',
  imports: [FormsModule],
  templateUrl: './page-creation-equipe-projet-component.html',
  styleUrl: './page-creation-equipe-projet-component.css',
})
export class PageCreationEquipeProjetComponent implements OnInit, OnDestroy {
  private activateRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(ApiService);
  projetId = this.activateRoute.snapshot.paramMap.get('id');
  private subscription = new Subscription();
  projet = signal<Projet | null>(null);
  utilisateurs = signal<Utilisateur[] | null>(null);
  equipe = signal({
    nom_equipe: '',
    projet: this.projetId,
    membres: [] as number[],
  });
  recherche = signal<any>('');

  ngOnInit(): void {
    this.subscription.add(
      this.apiService.get<Projet>(`/projets/${this.projetId}`).subscribe((data) => {
        this.projet.set(data);
      }),
    );

    this.subscription.add(
      this.apiService.get<PaginatedResponse<Utilisateur>>('/utilisateurs/').subscribe((data) => {
        this.utilisateurs.set(data.results);
      }),
    );
  }

  ajouterMembre(user: Utilisateur) {
    const membres = this.equipe().membres;

    if (!membres.includes(user.id)) {
      this.equipe.update((e) => ({
        ...e,
        membres: [...e.membres, user.id],
      }));
    }
  }
  supprimerMembre(id: number) {
    this.equipe.update((e) => ({
      ...e,
      membres: e.membres.filter((m) => m !== id),
    }));
  }
  creerEquipe() {
    this.apiService.post('/equipes/', this.equipe()).subscribe({
      next: (res) => {
        // console.log(res);
        this.router.navigate(['/projets']);
      },
      error: (err) => {
        // console.error('Erreur création équipe', err);
      },
    });
  }
  estMembre(userId: number): boolean {
    return this.equipe().membres.includes(userId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
