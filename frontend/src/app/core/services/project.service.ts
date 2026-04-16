import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getProjects(featured?: boolean): Observable<Project[]> {
    const params = featured ? '?featured=true' : '';
    return this.http.get<Project[]>(`${this.base}/api/projects${params}`);
  }

  getProject(slug: string): Observable<Project> {
    return this.http.get<Project>(`${this.base}/api/projects/${slug}`);
  }

  create(data: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(`${this.base}/api/admin/projects`, data);
  }

  update(id: number, data: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.base}/api/admin/projects/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/api/admin/projects/${id}`);
  }
}
