import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-register-component',
  imports: [ReactiveFormsModule],
  templateUrl: './page-register-component.html',
  styleUrl: './page-register-component.css',
})
export class PageRegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  selectedAvatar?: File;

  registerForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['etudiant', Validators.required],
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedAvatar = input.files[0];
    }
  }

  submit() {
    if (this.registerForm.invalid) return;

    const data = {
      ...this.registerForm.value,
      avatar: this.selectedAvatar,
    };

    this.authService.register(data as any).subscribe({
      next: (res) => {
        this.router.navigate(["/acceuil"]);
        console.log('Inscription réussie', res);
      },
      error: (err) => {
        console.error('Erreur', err);
      },
    });
  }
}
