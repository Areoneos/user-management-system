import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Account } from '@app/_models';

const baseUrl = `${environment.apiUrl}/accounts`;

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accountSubject: BehaviorSubject<Account | null>;
  public account: Observable<Account | null>;
  private refreshTokenTimeout: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.accountSubject = new BehaviorSubject<Account | null>(null);
    this.account = this.accountSubject.asObservable();
  }

  public get accountValue(): Account | null {
    return this.accountSubject.value;
  }

  // Auth
  login(email: string, password: string) {
    return this.http.post<Account>(`${baseUrl}/authenticate`, { email, password }, { withCredentials: true })
      .pipe(map(account => {
        this.accountSubject.next(account);
        this.startRefreshTokenTimer();
        return account;
      }));
  }

  logout() {
    this.http.post(`${baseUrl}/revoke-token`, {}, { withCredentials: true }).subscribe();
    this.stopRefreshTokenTimer();
    this.accountSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  refreshToken() {
    return this.http.post<Account>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
      .pipe(map(account => {
        this.accountSubject.next(account);
        this.startRefreshTokenTimer();
        return account;
      }));
  }

  // Register + Email flows
  register(params: any) {
    return this.http.post(`${baseUrl}/register`, params);
  }

  verifyEmail(token: string) {
    return this.http.post(`${baseUrl}/verify-email`, { token });
  }

  forgotPassword(email: string) {
    return this.http.post(`${baseUrl}/forgot-password`, { email });
  }

  resetPassword(params: any) {
    return this.http.post(`${baseUrl}/reset-password`, params);
  }

  // Account CRUD
  getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(baseUrl);
  }

  getById(id: string): Observable<Account> {
    return this.http.get<Account>(`${baseUrl}/${id}`);
  }

  create(params: any): Observable<any> {
    return this.http.post(baseUrl, params);
  }

  update(id: string, params: any): Observable<Account> {
    return this.http.put<Account>(`${baseUrl}/${id}`, params)
      .pipe(map(account => {
        if (account.id === this.accountValue?.id) {
          account = { ...this.accountValue, ...account };
          this.accountSubject.next(account);
        }
        return account;
      }));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`)
      .pipe(finalize(() => {
        if (id === this.accountValue?.id) {
          this.logout();
        }
      }));
  }

  // Token timer helpers
  private startRefreshTokenTimer() {
    const jwtToken = JSON.parse(atob(this.accountValue!.jwtToken!.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);

    this.refreshTokenTimeout = setTimeout(() => {
      this.refreshToken().subscribe();
    }, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
