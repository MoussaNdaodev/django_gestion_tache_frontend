import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api/api-service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-page-creation-projet',
  imports: [RouterLink, FormsModule],
  templateUrl: './page-creation-projet.html',
  styleUrl: './page-creation-projet.css',
})
export class PageCreationProjet {

  private apiService = inject(ApiService);
  private router = inject(Router);

  projet = signal({
    titre: '',
    description: '',
    date_fin: '',
    fichiers: [] as File[],
    images: [] as File[]
  });

  erreur = signal<string | null>(null);
  loading = signal(false);

  
  onFichiersChange(event: any) {
    const files = Array.from(event.target.files) as File[];

    this.projet.update(p => ({
      ...p,
      fichiers: files
    }));
  }

  onImagesChange(event: any) {
    const files = Array.from(event.target.files) as File[];

    this.projet.update(p => ({
      ...p,
      images: files
    }));
  }

  creerProjet(form: NgForm) {

    if (!form.valid) {
      this.erreur.set("Veuillez remplir correctement le formulaire");
      return;
    }

    this.loading.set(true);
    this.erreur.set(null);

    const projet = this.projet();

    const formData = new FormData();

    formData.append('titre', projet.titre);
    formData.append('description', projet.description);
    formData.append('date_fin', projet.date_fin);

    projet.fichiers.forEach((file: File) => {
      formData.append('fichiers', file);
    });

    projet.images.forEach((file: File) => {
      formData.append('images', file);
    });

    this.apiService.post<any>('/projets/', formData).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/projets']);
      },
      error: () => {
        this.loading.set(false);
        this.erreur.set("Une erreur est survenue lors de la création du projet");
      }
    });

  }

}
