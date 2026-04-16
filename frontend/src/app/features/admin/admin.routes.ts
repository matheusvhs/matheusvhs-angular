import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'projects/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./project-form/project-form.component').then(m => m.ProjectFormComponent)
  },
  {
    path: 'projects/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./project-form/project-form.component').then(m => m.ProjectFormComponent)
  },
  {
    path: 'articles/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./article-form/article-form.component').then(m => m.ArticleFormComponent)
  },
  {
    path: 'articles/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./article-form/article-form.component').then(m => m.ArticleFormComponent)
  }
];
