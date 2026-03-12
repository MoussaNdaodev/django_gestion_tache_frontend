import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api/api-service';
import { StatsDashboard } from '../../core/models/statsDashboard.model';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { PrimeParTrimestrePipe } from '../../shared/pipes/prime-par-trimestre-pipe';

@Component({
  selector: 'app-page-statistiques-component',
  imports: [NgClass, DecimalPipe, DatePipe, PrimeParTrimestrePipe],
  templateUrl: './page-statistiques-component.html',
  styleUrl: './page-statistiques-component.css',
})
export class PageStatistiquesComponent implements OnInit {
  private apiService = inject(ApiService);

  dashboard = signal<StatsDashboard | null>(null);
  loading = signal(true);
  activeTab = signal<'trimestriel' | 'annuel'>('trimestriel');
  anneeSelectionnee = signal(new Date().getFullYear());

  // ce bout code utilise les signals et la detection de changement dans angular pour ajuster correctement la barre
  // des statitiques de realisation de taches par trimestre
  barHeights = computed(() => {
    const historique = this.dashboard()?.historique_trimestriel ?? [];
    const max = Math.max(...historique.map((s) => s.taux_realisation), 1);
    return [1, 2, 3, 4].map((t) => {
      const stat = historique.find((s) => s.trimestre === t);
      return stat ? Math.round((stat.taux_realisation / max) * 100) : 0;
    });
  });

  statutPrime = computed(() => {
    const taux = this.dashboard()?.taux_realisation ?? 0;
    const primes = this.dashboard()?.primes ?? [];
    if (primes.some((p) => p.type_prime === '100%'))
      return { label: 'Prime Maximale 100K', css: 'bg-yellow-100 text-yellow-700' };
    if (primes.some((p) => p.type_prime === '90%'))
      return { label: 'Prime 30K', css: 'bg-emerald-100 text-emerald-600' };
    if (taux >= 80) return { label: `Non éligible (${taux}%)`, css: 'bg-slate-100 text-slate-500' };
    return { label: 'Non éligible', css: 'bg-red-100 text-red-500' };
  });

  ngOnInit() {
    this.chargerDashboard();
  }

  chargerDashboard() {
    this.loading.set(true);
    this.apiService
      .get<StatsDashboard>(`/statistiques/dashboard/?annee=${this.anneeSelectionnee()}`)
      .subscribe({
        next: (data) => {
          this.dashboard.set(data);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  recalculer() {
    this.apiService.post('/statistiques/recalculer/', {}).subscribe(() => {
      this.chargerDashboard();
    });
  }

  changerAnnee(annee: number) {
    this.anneeSelectionnee.set(annee);
    this.chargerDashboard();
  }

  getTrimestrelabel(t: number): string {
    return ['T1 (Jan-Mar)', 'T2 (Avr-Jun)', 'T3 (Jul-Sep)', 'T4 (Oct-Déc)'][t - 1];
  }
}
