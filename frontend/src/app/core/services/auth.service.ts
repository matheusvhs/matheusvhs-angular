import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;
  private readonly STORAGE_KEY = 'portfolio_auth';

  /** Tenta autenticar enviando credenciais para /api/admin/verify */
  login(username: string, password: string): Observable<boolean> {
    const credentials = btoa(`${username}:${password}`);
    return this.http
      .get<void>(`${this.base}/api/admin/verify`, {
        headers: { Authorization: `Basic ${credentials}` }
      })
      .pipe(
        tap(() => sessionStorage.setItem(this.STORAGE_KEY, credentials)),
        tap(() => true as any),
        catchError(() => of(false))
      ) as Observable<boolean>;
  }

  logout(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.STORAGE_KEY);
  }

  getCredentials(): string | null {
    return sessionStorage.getItem(this.STORAGE_KEY);
  }
}
