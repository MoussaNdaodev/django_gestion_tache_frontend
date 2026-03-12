import { Component, inject, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { Tache } from '../../core/models/tache.model';
import { ApiService } from '../../core/services/api/api-service';
import { Subscription } from 'rxjs';
import { PaginatedResponse } from '../../core/models/PaginatedResponse';
import { DatePipe, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-mes-taches-component',
  templateUrl: './page-mes-taches-component.html',
  styleUrl: './page-mes-taches-component.css',
  imports: [DatePipe, NgClass],
})
export class PageMesTachesComponent implements OnInit, OnDestroy {
  taches = signal<Tache[]>([]);
  filtreStatut = signal<string>('a_faire');
  recherche = signal<string>('');

  private apiService = inject(ApiService);
  private subscription = new Subscription();
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.subscription.add(
      this.apiService.get<PaginatedResponse<Tache>>('/taches/mes-taches').subscribe((data) => {
        this.taches.set(data.results);
      }),
    );
  }

  tachesFiltrees = computed(() => {
    let list = this.taches();

    const statut = this.filtreStatut();
    const recherche = this.recherche().toLowerCase();

    if (statut) {
      list = list.filter((t) => t.statut === statut);
    }

    if (recherche) {
      list = list.filter((t) => t.titre.toLowerCase().includes(recherche));
    }

    return list;
  });

  changerFiltre(statut: string) {
    this.filtreStatut.set(statut);
  }

  rechercher(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.recherche.set(value);
  }
  changerStatut(tache: Tache, statut: string) {
    const nouveauStatut = statut as 'a_faire' | 'en_cours' | 'termine';

    this.http
      .patch(`http://localhost:8000/api/taches/${tache.id}/changer-statut/`, {
        statut: nouveauStatut,
      })
      .subscribe({
        next: (res: any) => {
          const updated = this.taches().map((t) =>
            t.id === tache.id ? { ...t, statut: nouveauStatut } : t,
          );
          this.taches.set(updated);
        },
        error: (err) => {
          // console.error('Erreur lors du changement de statut', err);
        },
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
