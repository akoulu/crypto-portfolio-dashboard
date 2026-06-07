import { Routes } from '@angular/router';
import { authGuard, homeRedirectGuard } from './core/firebase/auth-firebase.guards';
import { Shell } from './layout/shell/shell';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'register', redirectTo: '/register', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: Shell,
    children: [
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
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'portfolio',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/portfolio/pages/portfolio/portfolio').then((m) => m.Portfolio),
      },
      {
        path: 'transactions',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/transactions/pages/transactions/transactions').then(
            (m) => m.Transactions,
          ),
      },
      {
        path: 'analytics',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/analytics/pages/analytics/analytics').then((m) => m.Analytics),
      },
      {
        path: '',
        pathMatch: 'full',
        canActivate: [homeRedirectGuard],
        children: [],
      },
    ],
  },
];
