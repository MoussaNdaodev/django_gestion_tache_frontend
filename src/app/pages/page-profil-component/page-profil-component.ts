import { ApiService } from './../../core/services/api/api-service';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Utilisateur } from '../../core/models/utilisateur.model';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-profil-component',
  imports: [RouterLink],
  templateUrl: './page-profil-component.html',
  styleUrl: './page-profil-component.css',
})
export class PageProfilComponent implements OnInit, OnDestroy {
  user = signal<Utilisateur | null>(null);
  private subscription = new Subscription();
  private apiService = inject(ApiService);
  ngOnInit(): void {
    this.subscription.add(
      this.apiService.get<Utilisateur>('/utilisateurs/profil/').subscribe({
        next: (data) => {
          this.user.set(data);
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
