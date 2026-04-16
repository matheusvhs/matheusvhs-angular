import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule, MatSnackBarModule, MatIconModule
  ],
  template: `
    <div class="form-header">
      <a mat-button routerLink="/admin">
        <mat-icon>arrow_back</mat-icon> Painel
      </a>
      <h1>{{ isEdit ? 'Editar' : 'Novo' }} Projeto</h1>
    </div>

    <mat-card class="form-card">
      <mat-card-content>
        <form [formGroup]="form" (ngSubmit)="save()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Título *</mat-label>
            <input matInput formControlName="title" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Slug (URL amigável)</mat-label>
            <input matInput formControlName="slug" placeholder="meu-projeto" />
            <mat-hint>Deixe vazio para gerar automaticamente</mat-hint>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Resumo</mat-label>
            <textarea matInput formControlName="summary" rows="2"></textarea>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Descrição (Markdown)</mat-label>
            <textarea matInput formControlName="description" rows="8"></textarea>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Tech Stack (separado por vírgula)</mat-label>
            <input matInput formControlName="techStack" placeholder="Java, Spring Boot, Angular" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>URL do GitHub</mat-label>
            <input matInput formControlName="githubUrl" type="url" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>URL do Demo</mat-label>
            <input matInput formControlName="liveUrl" type="url" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>URL da Imagem</mat-label>
            <input matInput formControlName="imageUrl" type="url" />
          </mat-form-field>

          <mat-checkbox formControlName="featured">Projeto em destaque</mat-checkbox>

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
    .form-card { max-width: 800px; }
    .full-width { width: 100%; margin-bottom: 12px; display: block; }
    .half-width { width: calc(50% - 8px); margin-bottom: 12px; display: inline-block; }
    .half-width:first-of-type { margin-right: 16px; }
    .form-actions { margin-top: 24px; display: flex; gap: 8px; justify-content: flex-end; }
    mat-checkbox { margin-bottom: 16px; }
  `]
})
export class ProjectFormComponent implements OnInit {
  private service = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);

  form = this.fb.group({
    title: ['', Validators.required],
    slug: [''],
    summary: [''],
    description: [''],
    techStack: [''],
    githubUrl: [''],
    liveUrl: [''],
    imageUrl: [''],
    featured: [false]
  });

  isEdit = false;
  projectId?: number;
  saving = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.projectId = +id;
      this.service.getProject('').subscribe(); // We need to load by ID — use projects list
      // Load project by ID via the list endpoint (simple approach)
      this.service.getProjects().subscribe(projects => {
        const p = projects.find(proj => proj.id === this.projectId);
        if (p) this.form.patchValue(p as any);
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    this.saving = true;
    const data = this.form.value;

    const action = this.isEdit
      ? this.service.update(this.projectId!, data as any)
      : this.service.create(data as any);

    action.subscribe({
      next: () => {
        this.snack.open('Projeto salvo com sucesso!', 'OK', { duration: 3000 });
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.snack.open('Erro ao salvar projeto', 'OK', { duration: 3000 });
        this.saving = false;
      }
    });
  }
}
