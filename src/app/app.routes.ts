import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./features/portfolio/pages/portfolio/portfolio').then((m) => m.Portfolio),
      },
      {
        path: 'transactions',
        loadComponent: () =>
          import('./features/transactions/pages/transactions/transactions').then(
            (m) => m.Transactions,
          ),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/analytics/pages/analytics/analytics').then((m) => m.Analytics),
      },
      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/pages/register/register').then((m) => m.Register),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  { path: 'auth', redirectTo: '/login', pathMatch: 'full' },
  { path: 'auth/register', redirectTo: '/register', pathMatch: 'full' },
];
