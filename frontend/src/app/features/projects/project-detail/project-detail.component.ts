import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatChipsModule, MatProgressSpinnerModule, MatIconModule, MarkdownComponent],
  template: `
    @if (loading) {
      <div class="center"><mat-spinner /></div>
    }

    @if (!loading && project) {
      <div class="header">
        <a mat-button routerLink="/projects">
          <mat-icon>arrow_back</mat-icon> Projetos
        </a>
        <h1>{{ project.title }}</h1>
        <mat-chip-set>
          @for (tech of getTechs(project.techStack); track tech) {
            <mat-chip>{{ tech }}</mat-chip>
          }
        </mat-chip-set>
        <div class="links">
          @if (project.githubUrl) {
            <a mat-raised-button color="primary" [href]="project.githubUrl" target="_blank">
              <mat-icon>code</mat-icon> GitHub
            </a>
          }
          @if (project.liveUrl) {
            <a mat-raised-button color="accent" [href]="project.liveUrl" target="_blank">
              <mat-icon>open_in_new</mat-icon> Demo ao vivo
            </a>
          }
        </div>
      </div>

      <div class="content">
        <markdown [data]="project.description" />
      </div>
    }
  `,
  styles: [`
    .center { display: flex; justify-content: center; padding: 48px; }
    .header { margin-bottom: 32px; }
    .header h1 { margin: 8px 0 16px; }
    .links { margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap; }
    .content { max-width: 800px; }
    markdown { line-height: 1.7; }
  `]
})
export class ProjectDetailComponent implements OnInit {
  private service = inject(ProjectService);
  private route = inject(ActivatedRoute);
  project?: Project;
  loading = true;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.service.getProject(slug).subscribe({
      next: data => { this.project = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  getTechs(stack: string): string[] {
    return stack ? stack.split(',').map(t => t.trim()) : [];
  }
}
