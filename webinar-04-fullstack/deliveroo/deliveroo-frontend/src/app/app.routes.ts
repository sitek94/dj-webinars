import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(routes => routes.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'fleet',
    loadComponent: () => import('./features/fleet/fleet.component').then(m => m.FleetComponent),
    canActivate: [authGuard]
  },
  {
    path: 'personnel',
    loadComponent: () => import('./features/personnel/personnel.component').then(m => m.PersonnelComponent),
    canActivate: [authGuard]
  },
  {
    path: 'delivery-process',
    loadChildren: () => import('./features/delivery-process/delivery-process.routes').then(routes => routes.DELIVERY_PROCESS_ROUTES)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];