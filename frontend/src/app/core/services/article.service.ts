import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.base}/api/articles`);
  }

  getArticle(slug: string): Observable<Article> {
    return this.http.get<Article>(`${this.base}/api/articles/${slug}`);
  }

  getAllAdmin(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.base}/api/admin/articles`);
  }

  create(data: Partial<Article>): Observable<Article> {
    return this.http.post<Article>(`${this.base}/api/admin/articles`, data);
  }

  update(id: number, data: Partial<Article>): Observable<Article> {
    return this.http.put<Article>(`${this.base}/api/admin/articles/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/api/admin/articles/${id}`);
  }
}
