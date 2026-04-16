import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MarkdownComponent } from 'ngx-markdown';
import { ArticleService } from '../../../core/services/article.service';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule, MatSnackBarModule,
    MatIconModule, MatTabsModule, MarkdownComponent
  ],
  template: `
    <div class="form-header">
      <a mat-button routerLink="/admin">
        <mat-icon>arrow_back</mat-icon> Painel
      </a>
      <h1>{{ isEdit ? 'Editar' : 'Novo' }} Artigo</h1>
    </div>

    <mat-card class="form-card">
      <mat-card-content>
        <form [formGroup]="form" (ngSubmit)="save()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Título *</mat-label>
            <input matInput formControlName="title" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Slug</mat-label>
            <input matInput formControlName="slug" />
            <mat-hint>Deixe vazio para gerar automaticamente</mat-hint>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Resumo</mat-label>
            <textarea matInput formControlName="summary" rows="2"></textarea>
          </mat-form-field>

          <!-- Editor com preview -->
          <mat-tab-group class="content-tabs">
            <mat-tab label="Editar">
              <mat-form-field appearance="outline" class="full-width tab-field">
                <mat-label>Conteúdo (Markdown)</mat-label>
                <textarea matInput formControlName="content" rows="20"></textarea>
              </mat-form-field>
            </mat-tab>
            <mat-tab label="Preview">
              <div class="preview-panel">
                <markdown [data]="form.get('content')?.value || ''" />
              </div>
            </mat-tab>
          </mat-tab-group>

          <mat-checkbox formControlName="published">Publicar artigo</mat-checkbox>

          <div class="form-actions">
            <a mat-button routerLink="/admin">Cancelar</a>
            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || saving">
              @if (saving) { <mat-spinner diameter="20" /> }
              @else { Salvar }
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .form-header { margin-bottom: 16px; }
    .form-card { max-width: 900px; }
    .full-width { width: 100%; margin-bottom: 12px; display: block; }
    .content-tabs { margin-bottom: 16px; }
    .tab-field { margin-top: 12px; }
    .preview-panel { padding: 16px; min-height: 400px; line-height: 1.8; }
    .form-actions { margin-top: 24px; display: flex; gap: 8px; justify-content: flex-end; }
    mat-checkbox { margin-bottom: 16px; }
  `]
})
export class ArticleFormComponent implements OnInit {
  private service = inject(ArticleService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);

  form = this.fb.group({
    title: ['', Validators.required],
    slug: [''],
    summary: [''],
    content: [''],
    published: [false]
  });

  isEdit = false;
  articleId?: number;
  saving = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.articleId = +id;
      this.service.getAllAdmin().subscribe(articles => {
        const a = articles.find(art => art.id === this.articleId);
        if (a) this.form.patchValue(a as any);
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    this.saving = true;
    const data = this.form.value;

    const action = this.isEdit
      ? this.service.update(this.articleId!, data as any)
      : this.service.create(data as any);

    action.subscribe({
      next: () => {
        this.snack.open('Artigo salvo com sucesso!', 'OK', { duration: 3000 });
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.snack.open('Erro ao salvar artigo', 'OK', { duration: 3000 });
        this.saving = false;
      }
    });
  }
}
