import { Component, input } from '@angular/core';
import { Projet } from '../../../core/models/projet.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-minimal-projet-card-component',
  imports: [RouterLink],
  templateUrl: './minimal-projet-card-component.html',
  styleUrl: './minimal-projet-card-component.css',
})
export class MinimalProjetCardComponent {
  projet = input.required<Projet | null>();
}
