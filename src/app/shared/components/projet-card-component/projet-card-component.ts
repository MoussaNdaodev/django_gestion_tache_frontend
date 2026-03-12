import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { Projet } from '../../../core/models/projet.model';
import { ApiService } from '../../../core/services/api/api-service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-projet-card-component',
  imports: [DatePipe, RouterLink],
  templateUrl: './projet-card-component.html',
  styleUrl: './projet-card-component.css',
})
export class ProjetCardComponent{
  projet = input.required<Projet | null>();
}
