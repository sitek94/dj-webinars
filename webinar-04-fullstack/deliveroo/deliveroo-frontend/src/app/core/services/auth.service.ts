import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Create a signal for authentication state
  private _isAuthenticated = signal<boolean>(false);
  
  // Public readonly accessor for the authentication state
  isAuthenticated = this._isAuthenticated.asReadonly();

  constructor() {
    // Check if user is logged in from local storage
    const storedAuthState = localStorage.getItem('isAuthenticated');
    if (storedAuthState === 'true') {
      this._isAuthenticated.set(true);
    }
  }

  login(username: string, password: string): boolean {
    // This is a mock login - in a real app, you would validate credentials against a backend
    // For demo purposes, any non-empty credentials will work
    if (username && password) {
      this._isAuthenticated.set(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this._isAuthenticated.set(false);
    localStorage.removeItem('isAuthenticated');
  }
}