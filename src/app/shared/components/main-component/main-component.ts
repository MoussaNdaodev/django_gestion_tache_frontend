import { AuthService } from './../../../core/services/auth/auth-service';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { NotificationService } from '../../../core/services/notifications/notification-service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-main-component',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive, NgClass , DatePipe],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css',
})
export class MainComponent {
  utilisateurConnecte = signal<any>(null);
  private AuthService = inject(AuthService);
  constructor() {
    this.utilisateurConnecte.set(this.AuthService.getUser());
  }

  notifService = inject(NotificationService);
  ouvert = false;

  ngOnInit() {
    this.notifService.charger();
    setInterval(() => this.notifService.charger(), 30000);
  }

  toggleDropdown() {
    this.ouvert = !this.ouvert;
  }

  fermerDropdown() {
    this.ouvert = false;
  }
}
