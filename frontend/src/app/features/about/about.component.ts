import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileService } from '../../core/services/profile.service';
import { Profile } from '../../core/models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    MatCardModule, MatProgressBarModule, MatListModule,
    MatIconModule, MatProgressSpinnerModule, MatDividerModule
  ],
  template: `
    @if (loading) {
      <div class="center"><mat-spinner /></div>
    }

    @if (!loading && profile) {
      <h1 class="page-title">Sobre Mim</h1>

      <!-- Skills -->
      <section class="section">
        <h2>Skills</h2>
        @for (category of skillCategories; track category) {
          <h3 class="category">{{ category }}</h3>
          @for (skill of getSkillsByCategory(category); track skill.id) {
            <div class="skill-row">
              <span class="skill-name">{{ skill.name }}</span>
              <mat-progress-bar
                mode="determinate"
                [value]="skill.level * 20"
                color="primary"
              />
            </div>
          }
        }
      </section>

      <mat-divider />

      <!-- Experience -->
      <section class="section">
        <h2>Experiência</h2>
        @for (exp of profile.experiences; track exp.id) {
          <mat-card class="exp-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>work</mat-icon>
              <mat-card-title>{{ exp.role }}</mat-card-title>
              <mat-card-subtitle>
                {{ exp.company }} · {{ formatDate(exp.startDate) }} – {{ exp.endDate ? formatDate(exp.endDate) : 'Atual' }}
              </mat-card-subtitle>
            </mat-card-header>
            @if (exp.description) {
              <mat-card-content>
                <p>{{ exp.description }}</p>
              </mat-card-content>
            }
          </mat-card>
        }
      </section>

      <mat-divider />

      <!-- Education -->
      <section class="section">
        <h2>Formação</h2>
        @for (edu of profile.educations; track edu.id) {
          <mat-card class="exp-card">
            <mat-card-header>
              <mat-icon mat-card-avatar>school</mat-icon>
              <mat-card-title>{{ edu.degree }} em {{ edu.field }}</mat-card-title>
              <mat-card-subtitle>
                {{ edu.institution }} · {{ edu.startYear }}–{{ edu.endYear }}
              </mat-card-subtitle>
            </mat-card-header>
          </mat-card>
        }
      </section>
    }
  `,
  styles: [`
    .page-title { margin-bottom: 24px; }
    .center { display: flex; justify-content: center; padding: 48px; }
    .section { max-width: 800px; margin: 32px 0; }
    .category { color: #666; margin: 16px 0 8px; font-size: 0.9rem; text-transform: uppercase; }
    .skill-row {
      display: flex; align-items: center; gap: 16px; margin-bottom: 8px;
    }
    .skill-name { min-width: 160px; font-size: 0.95rem; }
    mat-progress-bar { flex: 1; }
    .exp-card { margin-bottom: 16px; }
    .exp-card p { color: #444; }
    mat-divider { margin: 8px 0; }
  `]
})
export class AboutComponent implements OnInit {
  private service = inject(ProfileService);
  profile?: Profile;
  skillCategories: string[] = [];
  loading = true;

  ngOnInit() {
    this.service.getProfile().subscribe({
      next: data => {
        this.profile = data;
        this.skillCategories = [...new Set(data.skills.map(s => s.category))];
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  getSkillsByCategory(category: string) {
    return this.profile?.skills.filter(s => s.category === category) ?? [];
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  }
}
