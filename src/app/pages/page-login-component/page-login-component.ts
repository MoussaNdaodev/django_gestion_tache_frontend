import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-login-component',
  imports: [RouterLink, FormsModule],
  templateUrl: './page-login-component.html',
  styleUrl: './page-login-component.css',
})
export class PageLoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  user = { email: '', password: '' };

  onSubmit(form: any) {
    if (!form.valid) return;

    this.authService.login(this.user).subscribe({
      next: () => {
        //  redirection vers returnUrl si présent, sinon /acceuil
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/acceuil';
        this.router.navigate([returnUrl]);
      },
      error: (err) => {
        // console.error('Erreur login :', err);
        alert('Email ou mot de passe incorrect !');
      },
    });
  }
}
