import { Subscription } from 'rxjs';
import { ApiService } from '../../core/services/api/api-service';
import { Projet } from './../../core/models/projet.model';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProjetCardComponent } from "../../shared/components/projet-card-component/projet-card-component";
import { PaginatedResponse } from '../../core/models/PaginatedResponse';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-projets-component',
  imports: [ProjetCardComponent, RouterLink],
  templateUrl: './page-projets-component.html',
  styleUrls: ['./page-projets-component.css'],
})
export class PageProjetsComponent implements OnInit, OnDestroy {
  projets = signal<Projet[]>([]);
  total = signal<number>(0);
  currentPage = signal<number>(1);
  pageSize = 10;

  private apiService = inject(ApiService);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets(page: number = 1) {
    this.subscription.add(
      this.apiService.get<PaginatedResponse<Projet>>(`/projets/?page=${page}`).subscribe((data) => {
        // console.log(data, "projets");
        this.projets.set(data.results);
        this.total.set(data.count);
        this.currentPage.set(page);
      })
    );
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadProjets(page);
    }
  }

  totalPages(): number {
    return Math.ceil(this.total() / this.pageSize);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
