import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api-service';
import { Notification } from '../../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiService = inject(ApiService);

  notifications = signal<Notification[]>([]);

  nonLues = computed(() =>
    this.notifications().filter(n => !n.est_lu).length
  );

  charger() {
    this.apiService.get<any>('/notifications/').subscribe((data) => {
      this.notifications.set(data.results ?? data);
    });
  }

  marquerLue(id: number) {
    this.apiService.patch<Notification>(`/notifications/${id}/marquer-lue/`, {})
      .subscribe(() => {
        this.notifications.update(notifs =>
          notifs.map(n => n.id === id ? { ...n, est_lu: true } : n)
        );
      });
  }
  
  toutMarquerLues() {
    this.notifications()
      .filter(n => !n.est_lu)
      .forEach(n => this.marquerLue(n.id));
  }
}
