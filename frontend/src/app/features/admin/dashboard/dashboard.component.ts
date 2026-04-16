import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { ProjectService } from '../../../core/services/project.service';
import { ArticleService } from '../../../core/services/article.service';
import { Project, Article } from '../../../core/models';
import { ConfirmDialogComponent } from '../confirm-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink, DatePipe, MatTableModule, MatButtonModule, MatIconModule,
    MatProgressSpinnerModule, MatTabsModule, MatSnackBarModule, MatDialogModule, MatChipsModule
  ],
  template: `
    <div class="dashboard-header">
      <h1>Painel Admin</h1>
    </div>

    <mat-tab-group>
      <!-- Projetos -->
      <mat-tab label="Projetos">
        <div class="tab-content">
          <div class="tab-actions">
            <a mat-raised-button color="primary" routerLink="/admin/projects/new">
              <mat-icon>add</mat-icon> Novo Projeto
            </a>
          </div>
          @if (loadingProjects) {
            <div class="center"><mat-spinner /></div>
          }
          @if (!loadingProjects) {
            <table mat-table [dataSource]="projects" class="full-table">
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef>Título</th>
                <td mat-cell *matCellDef="let row">{{ row.title }}</td>
              </ng-container>
              <ng-container matColumnDef="techStack">
                <th mat-header-cell *matHeaderCellDef>Tecnologias</th>
                <td mat-cell *matCellDef="let row">
                  <mat-chip-set>
                    @for (t of getTechs(row.techStack).slice(0,3); track t) {
                      <mat-chip>{{ t }}</mat-chip>
                    }
                  </mat-chip-set>
                </td>
              </ng-container>
              <ng-container matColumnDef="featured">
                <th mat-header-cell *matHeaderCellDef>Destaque</th>
                <td mat-cell *matCellDef="let row">
                  <mat-icon [color]="row.featured ? 'accent' : ''">
                    {{ row.featured ? 'star' : 'star_border' }}
                  </mat-icon>
                </td>
              </ng-container>
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Ações</th>
                <td mat-cell *matCellDef="let row">
                  <a mat-icon-button [routerLink]="['/admin/projects', row.id, 'edit']" title="Editar">
                    <mat-icon>edit</mat-icon>
                  </a>
                  <button mat-icon-button color="warn" (click)="deleteProject(row)" title="Excluir">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="projectCols"></tr>
              <tr mat-row *matRowDef="let row; columns: projectCols;"></tr>
            </table>
          }
        </div>
      </mat-tab>

      <!-- Artigos -->
      <mat-tab label="Artigos">
        <div class="tab-content">
          <div class="tab-actions">
            <a mat-raised-button color="primary" routerLink="/admin/articles/new">
              <mat-icon>add</mat-icon> Novo Artigo
            </a>
          </div>
          @if (loadingArticles) {
            <div class="center"><mat-spinner /></div>
          }
          @if (!loadingArticles) {
            <table mat-table [dataSource]="articles" class="full-table">
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef>Título</th>
                <td mat-cell *matCellDef="let row">{{ row.title }}</td>
              </ng-container>
              <ng-container matColumnDef="published">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let row">
                  <mat-chip [color]="row.published ? 'primary' : ''">
                    {{ row.published ? 'Publicado' : 'Rascunho' }}
                  </mat-chip>
                </td>
              </ng-container>
              <ng-container matColumnDef="publishedAt">
                <th mat-header-cell *matHeaderCellDef>Data</th>
                <td mat-cell *matCellDef="let row">{{ row.publishedAt | date:'dd/MM/yyyy' }}</td>
              </ng-container>
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Ações</th>
                <td mat-cell *matCellDef="let row">
                  <a mat-icon-button [routerLink]="['/admin/articles', row.id, 'edit']" title="Editar">
                    <mat-icon>edit</mat-icon>
                  </a>
                  <button mat-icon-button color="warn" (click)="deleteArticle(row)" title="Excluir">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="articleCols"></tr>
              <tr mat-row *matRowDef="let row; columns: articleCols;"></tr>
            </table>
          }
        </div>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [`
    .dashboard-header { margin-bottom: 16px; }
    .tab-content { padding: 16px 0; }
    .tab-actions { margin-bottom: 16px; }
    .center { display: flex; justify-content: center; padding: 32px; }
    .full-table { width: 100%; }
  `]
})
export class DashboardComponent implements OnInit {
  private projectService = inject(ProjectService);
  private articleService = inject(ArticleService);
  private snack = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  projects: Project[] = [];
  articles: Article[] = [];
  loadingProjects = true;
  loadingArticles = true;
  projectCols = ['title', 'techStack', 'featured', 'actions'];
  articleCols = ['title', 'published', 'publishedAt', 'actions'];

  ngOnInit() {
    this.loadProjects();
    this.loadArticles();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: data => { this.projects = data; this.loadingProjects = false; },
      error: () => { this.loadingProjects = false; }
    });
  }

  loadArticles() {
    this.articleService.getAllAdmin().subscribe({
      next: data => { this.articles = data; this.loadingArticles = false; },
      error: () => { this.loadingArticles = false; }
    });
  }

  deleteProject(project: Project) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Excluir projeto "${project.title}"?` }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.projectService.delete(project.id).subscribe({
        next: () => {
          this.projects = this.projects.filter(p => p.id !== project.id);
          this.snack.open('Projeto excluído', 'OK', { duration: 3000 });
        },
        error: () => this.snack.open('Erro ao excluir projeto', 'OK', { duration: 3000 })
      });
    });
  }

  deleteArticle(article: Article) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Excluir artigo "${article.title}"?` }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.articleService.delete(article.id).subscribe({
        next: () => {
          this.articles = this.articles.filter(a => a.id !== article.id);
          this.snack.open('Artigo excluído', 'OK', { duration: 3000 });
        },
        error: () => this.snack.open('Erro ao excluir artigo', 'OK', { duration: 3000 })
      });
    });
  }

  getTechs(stack: string): string[] {
    return stack ? stack.split(',').map(t => t.trim()) : [];
  }
}
