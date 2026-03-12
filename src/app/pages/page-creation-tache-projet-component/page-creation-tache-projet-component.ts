import { Projet } from './../../core/models/projet.model';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api/api-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { Tache } from '../../core/models/tache.model';
import { Utilisateur } from '../../core/models/utilisateur.model';
import { PaginatedResponse } from '../../core/models/PaginatedResponse';

@Component({
  selector: 'app-page-creation-tache-projet-component',
  imports: [RouterLink, FormsModule],
  templateUrl: './page-creation-tache-projet-component.html',
  styleUrl: './page-creation-tache-projet-component.css',
})
export class PageCreationTacheProjetComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private subscription = new Subscription();
  private activateRoute = inject(ActivatedRoute);
  utilisateurs = signal<Utilisateur[] | null>(null);
  projetId = this.activateRoute.snapshot.paramMap.get('id');
  tache = signal({
    titre: '',
    description: '',
    date_limite: '',
    priorite: '',
    projet: '',
    assigne_a: '',
  });

  ngOnInit(): void {
    if (this.projetId) {
      this.tache.update((t) => ({
        ...t,
        projet: this.projetId!,
      }));
    }

    this.subscription.add(
      this.apiService.get<PaginatedResponse<Utilisateur>>('/utilisateurs/').subscribe((data) => {
        this.utilisateurs.set(data.results);
      }),
    );
  }

  erreur = signal<string | null>(null);
  loading = signal(false);

  creerTache(form: NgForm) {
    if (!form.valid) {
      this.erreur.set('Veuillez remplir correctement le formulaire');
      return;
    }

    this.loading.set(true);
    this.erreur.set(null);

    const tache = this.tache();

    const formData = new FormData();

    formData.append('titre', tache.titre);
    formData.append('description', tache.description);
    formData.append('date_limite', tache.date_limite);
    formData.append('priorite', tache.priorite);
    formData.append('assigne_a', tache.assigne_a);
    formData.append('projet', tache.projet);

    this.apiService.post<any>('/taches/', formData).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate([`/projets/${this.projetId}`]);
      },
      error: (error) => {
        this.loading.set(false);
        // console.log(error)
        this.erreur.set('Une erreur est survenue lors de la création de tache');
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
