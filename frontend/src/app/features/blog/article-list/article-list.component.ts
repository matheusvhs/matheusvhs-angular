import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ArticleService } from '../../../core/services/article.service';
import { Article } from '../../../core/models';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [RouterLink, DatePipe, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <h1 class="page-title">Blog</h1>

    @if (loading) {
      <div class="center"><mat-spinner /></div>
    }

    @if (!loading && articles.length === 0) {
      <p class="empty">Nenhum artigo publicado ainda.</p>
    }

    <div class="list">
      @for (a of articles; track a.id) {
        <mat-card class="article-card">
          <mat-card-header>
            <mat-card-title>{{ a.title }}</mat-card-title>
            <mat-card-subtitle>
              {{ a.publishedAt | date:'dd/MM/yyyy' }}
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ a.summary }}</p>
          </mat-card-content>
          <mat-card-actions>
            <a mat-button color="primary" [routerLink]="['/blog', a.slug]">Ler artigo</a>
          </mat-card-actions>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .page-title { margin-bottom: 24px; }
    .center { display: flex; justify-content: center; padding: 48px; }
    .empty { color: #666; text-align: center; padding: 48px; }
    .list { display: flex; flex-direction: column; gap: 16px; max-width: 800px; }
    .article-card p { color: #444; }
  `]
})
export class ArticleListComponent implements OnInit {
  private service = inject(ArticleService);
  articles: Article[] = [];
  loading = true;

  ngOnInit() {
    console.log('[Blog] ngOnInit chamado');
    this.service.getArticles().subscribe({
      next: data => {
        console.log('[Blog] dados recebidos:', data.length);
        this.articles = data;
        this.loading = false;
      },
      error: (e) => {
        console.error('[Blog] erro:', e);
        this.loading = false;
      }
    });
  }
}
