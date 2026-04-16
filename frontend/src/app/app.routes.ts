import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { ProjectDetailComponent } from './features/projects/project-detail/project-detail.component';
import { ArticleListComponent } from './features/blog/article-list/article-list.component';
import { ArticleDetailComponent } from './features/blog/article-detail/article-detail.component';
import { AboutComponent } from './features/about/about.component';
import { LoginComponent } from './features/admin/login/login.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ProjectFormComponent } from './features/admin/project-form/project-form.component';
import { ArticleFormComponent } from './features/admin/article-form/article-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },

  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:slug', component: ProjectDetailComponent },

  { path: 'blog', component: ArticleListComponent },
  { path: 'blog/:slug', component: ArticleDetailComponent },

  { path: 'about', component: AboutComponent },

  { path: 'admin/login', component: LoginComponent },
  { path: 'admin', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'admin/projects/new', component: ProjectFormComponent, canActivate: [authGuard] },
  { path: 'admin/projects/:id/edit', component: ProjectFormComponent, canActivate: [authGuard] },
  { path: 'admin/articles/new', component: ArticleFormComponent, canActivate: [authGuard] },
  { path: 'admin/articles/:id/edit', component: ArticleFormComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'projects' }
];
