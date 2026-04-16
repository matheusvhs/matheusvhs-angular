import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { ArticleService } from '../../../core/services/article.service';
import { Article } from '../../../core/models';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, MatButtonModule, MatProgressSpinnerModule, MatIconModule, MarkdownComponent],
  template: `
    @if (loading) {
      <div class="center"><mat-spinner /></div>
    }

    @if (!loading && article) {
      <div class="header">
        <a mat-button routerLink="/blog">
          <mat-icon>arrow_back</mat-icon> Blog
        </a>
        <h1>{{ article.title }}</h1>
        <p class="date">Publicado em {{ article.publishedAt | date:'dd/MM/yyyy' }}</p>
      </div>

      <div class="content">
        <markdown [data]="article.content" />
      </div>
    }
  `,
  styles: [`
    .center { display: flex; justify-content: center; padding: 48px; }
    .header { margin-bottom: 32px; }
    .header h1 { margin: 8px 0 4px; }
    .date { color: #666; margin: 0 0 16px; }
    .content { max-width: 800px; }
    markdown { line-height: 1.8; }
  `]
})
export class ArticleDetailComponent implements OnInit {
  private service = inject(ArticleService);
  private route = inject(ActivatedRoute);
  article?: Article;
  loading = true;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.service.getArticle(slug).subscribe({
      next: data => { this.article = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
