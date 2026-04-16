import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatSnackBarModule
  ],
  template: `
    <div class="login-wrapper">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Admin</mat-card-title>
          <mat-card-subtitle>Acesso restrito</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form (ngSubmit)="login()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Usuário</mat-label>
              <input matInput [(ngModel)]="username" name="username" required />
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Senha</mat-label>
              <input matInput type="password" [(ngModel)]="password" name="password" required />
            </mat-form-field>
            <button
              mat-raised-button color="primary"
              type="submit"
              class="full-width"
              [disabled]="loading"
            >
              @if (loading) { <mat-spinner diameter="20" /> }
              @else { Entrar }
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-wrapper {
      display: flex; justify-content: center; align-items: center;
      min-height: calc(100vh - 80px);
    }
    .login-card { width: 360px; padding: 8px; }
    .full-width { width: 100%; margin-bottom: 12px; display: block; }
  `]
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  username = '';
  password = '';
  loading = false;

  login() {
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        if (this.auth.isLoggedIn()) {
          this.router.navigate(['/admin']);
        } else {
          this.snack.open('Usuário ou senha incorretos', 'Fechar', { duration: 3000 });
          this.loading = false;
        }
      },
      error: () => {
        this.snack.open('Erro ao conectar com o servidor', 'Fechar', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
