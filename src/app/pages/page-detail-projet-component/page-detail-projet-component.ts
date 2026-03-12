import { Component, inject, signal, ChangeDetectorRef, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api/api-service';
import { Subscription } from 'rxjs';
import { Projet } from '../../core/models/projet.model';
import { DatePipe } from '@angular/common';
import { Tache } from '../../core/models/tache.model';

@Component({
  selector: 'app-page-detail-projet-component',
  imports: [DatePipe, RouterLink],
  templateUrl: './page-detail-projet-component.html',
  styleUrl: './page-detail-projet-component.css',
})
export class PageDetailProjetComponent {
  private activateRoute = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);
  private subscription = new Subscription();
  private router = inject(Router);

  projetId = this.activateRoute.snapshot.paramMap.get('id');

  projet = signal<Projet | null>(null);
  taches = signal<Tache[] | null>(null);
  equipes = signal<any[]>([]);
  membres = signal<any[]>([]);
  statutFiltre = signal<string>('tous');
  tachesFiltrees = computed(() => {
    const taches = this.taches();
    const statut = this.statutFiltre();

    if (!taches) return [];

    if (statut === 'tous') {
      return taches;
    }

    return taches.filter((t) => t.statut === statut);
  });

  ngOnInit(): void {
    this.loadProjets();
    this.getEquipesProjet();
    this.getTachesProjet();
  }

  loadProjets() {
    this.subscription.add(
      this.apiService.get<Projet>(`/projets/${this.projetId}`).subscribe((data) => {
        this.projet.set(data);
      }),
    );
  }
  changerFiltre(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.statutFiltre.set(value);
  }

  getEquipesProjet() {
    this.subscription.add(
      this.apiService.get(`/projets/${this.projetId}/equipes`).subscribe((data: any) => {
        this.equipes.set(data);

        if (data.length) {
          this.getMembresEquipe(data[0].id);
        }
      }),
    );
  }

  getMembresEquipe(equipeId: number) {
    this.subscription.add(
      this.apiService.get(`/equipes/${equipeId}/membres`).subscribe((data: any) => {
        this.membres.set(data);
        this.cdr.detectChanges();
      }),
    );
  }
  getTachesProjet() {
    this.subscription.add(
      this.apiService.get(`/projets/${this.projetId}/taches`).subscribe((data: any) => {
        // console.log(data);
        this.taches.set(data);
        this.cdr.detectChanges();
      }),
    );
  }

  getFileName(url: string): string {
    return url.split('/').pop() || url;
  }

  supprimerProjet() {
    this.apiService.delete(`/projets`, Number(this.projetId)).subscribe({
      next: (res) => {
        // console.log(res);
        this.router.navigate(['/projets']);
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
