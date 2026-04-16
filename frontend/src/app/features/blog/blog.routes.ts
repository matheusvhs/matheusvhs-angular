import { Routes } from '@angular/router';

export const BLOG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./article-list/article-list.component').then(m => m.ArticleListComponent)
  },
  {
    path: ':slug',
    loadComponent: () =>
      import('./article-detail/article-detail.component').then(m => m.ArticleDetailComponent)
  }
];
