import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <span class="brand" routerLink="/">Portfolio</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/projects" routerLinkActive="active-link">Projetos</a>
      <a mat-button routerLink="/blog" routerLinkActive="active-link">Blog</a>
      <a mat-button routerLink="/about" routerLinkActive="active-link">Sobre</a>
      @if (auth.isLoggedIn()) {
        <a mat-button routerLink="/admin" routerLinkActive="active-link">
          <mat-icon>admin_panel_settings</mat-icon> Admin
        </a>
        <button mat-icon-button (click)="logout()" title="Sair">
          <mat-icon>logout</mat-icon>
        </button>
      }
    </mat-toolbar>

    <main class="container">
      <router-outlet />
    </main>
  `,
  styles: [`
    mat-toolbar { position: sticky; top: 0; z-index: 100; }
    .brand { font-weight: 700; cursor: pointer; margin-right: 16px; }
    .spacer { flex: 1; }
    .active-link { font-weight: 700; }
    .container { max-width: 1200px; margin: 24px auto; padding: 0 16px; }
  `]
})
export class App {
  auth = inject(AuthService);
  router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
