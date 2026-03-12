import { Projet } from './../../core/models/projet.model';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tache } from '../../core/models/tache.model';
import { ApiService } from '../../core/services/api/api-service';
import { Subscription } from 'rxjs';
import { PaginatedResponse } from '../../core/models/PaginatedResponse';
import { MinimalProjetCardComponent } from "../../shared/components/minimal-projet-card-component/minimal-projet-card-component";

@Component({
  selector: 'app-page-acceuil-component',
  imports: [RouterLink, MinimalProjetCardComponent],
  templateUrl: './page-acceuil-component.html',
  styleUrl: './page-acceuil-component.css',
})
export class PageAcceuilComponent implements OnInit, OnDestroy {
  projets = signal<Projet[] | null>(null);
  mestaches = signal<Tache[] | null>(null);
  tachesEnCours = signal<Tache[] | null>(null);
  tachesTerminees = signal<Tache[] | null>(null);
  private apiService = inject(ApiService);
  private subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
  this.subscription.add(
    this.apiService.get<PaginatedResponse<Projet>>('/projets/').subscribe({
      next: (data) => {
        this.projets.set(data.results.slice(0, 4));
        // console.log(data.results);
      },
    }),
  );

  this.subscription.add(
    this.apiService.get<PaginatedResponse<Tache>>('/taches/mes-taches/').subscribe({
      next: (data) => {
        this.mestaches.set(data.results);
        // console.log(data.results);
        this.tachesEnCours.set(data.results.filter((tache) => tache.statut === 'en_cours'));
        this.tachesTerminees.set(data.results.filter((tache) => tache.statut === 'termine'));
      },
    }),
  );
}

}
