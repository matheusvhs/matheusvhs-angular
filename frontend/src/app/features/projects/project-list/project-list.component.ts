import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatChipsModule, MatProgressSpinnerModule, MatIconModule],
  template: `
    <h1 class="page-title">Projetos</h1>

    @if (loading) {
      <div class="center">
        <mat-spinner />
      </div>
    }

    @if (!loading && projects.length === 0) {
      <p class="empty">Nenhum projeto encontrado.</p>
    }

    <div class="grid">
      @for (p of projects; track p.id) {
        <mat-card class="project-card">
          @if (p.imageUrl) {
            <img mat-card-image [src]="p.imageUrl" [alt]="p.title">
          }
          <mat-card-header>
            <mat-card-title>{{ p.title }}</mat-card-title>
            @if (p.featured) {
              <mat-icon class="featured-icon" color="accent">star</mat-icon>
            }
          </mat-card-header>
          <mat-card-content>
            <p class="summary">{{ p.summary }}</p>
            <mat-chip-set>
              @for (tech of getTechs(p.techStack); track tech) {
                <mat-chip>{{ tech }}</mat-chip>
              }
            </mat-chip-set>
          </mat-card-content>
          <mat-card-actions>
            <a mat-button color="primary" [routerLink]="['/projects', p.slug]">Ver mais</a>
            @if (p.githubUrl) {
              <a mat-button [href]="p.githubUrl" target="_blank">
                <mat-icon>code</mat-icon> GitHub
              </a>
            }
            @if (p.liveUrl) {
              <a mat-button [href]="p.liveUrl" target="_blank">
                <mat-icon>open_in_new</mat-icon> Demo
              </a>
            }
          </mat-card-actions>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .page-title { margin-bottom: 24px; }
    .center { display: flex; justify-content: center; padding: 48px; }
    .empty { color: #666; text-align: center; padding: 48px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }
    .project-card { display: flex; flex-direction: column; }
    .summary { color: #444; margin-bottom: 12px; }
    .featured-icon { margin-left: auto; }
    mat-card-actions { margin-top: auto; }
  `]
})
export class ProjectListComponent implements OnInit {
  private service = inject(ProjectService);
  projects: Project[] = [];
  loading = true;

  ngOnInit() {
    this.service.getProjects().subscribe({
      next: data => { this.projects = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  getTechs(stack: string): string[] {
    return stack ? stack.split(',').map(t => t.trim()) : [];
  }
}
