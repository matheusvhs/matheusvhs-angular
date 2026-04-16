import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile, Skill, Experience, Education } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.base}/api/profile`);
  }

  createSkill(data: Partial<Skill>): Observable<Skill> {
    return this.http.post<Skill>(`${this.base}/api/admin/skills`, data);
  }

  updateSkill(id: number, data: Partial<Skill>): Observable<Skill> {
    return this.http.put<Skill>(`${this.base}/api/admin/skills/${id}`, data);
  }

  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/api/admin/skills/${id}`);
  }

  createExperience(data: Partial<Experience>): Observable<Experience> {
    return this.http.post<Experience>(`${this.base}/api/admin/experiences`, data);
  }

  updateExperience(id: number, data: Partial<Experience>): Observable<Experience> {
    return this.http.put<Experience>(`${this.base}/api/admin/experiences/${id}`, data);
  }

  deleteExperience(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/api/admin/experiences/${id}`);
  }

  createEducation(data: Partial<Education>): Observable<Education> {
    return this.http.post<Education>(`${this.base}/api/admin/educations`, data);
  }

  updateEducation(id: number, data: Partial<Education>): Observable<Education> {
    return this.http.put<Education>(`${this.base}/api/admin/educations/${id}`, data);
  }

  deleteEducation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/api/admin/educations/${id}`);
  }
}
