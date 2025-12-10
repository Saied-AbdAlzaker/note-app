import { Routes } from '@angular/router';
import { AuthComponent } from './core/layouts/auth/auth.component';
import { NotfoundComponent } from './features/components/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { userGuard } from './core/guards/user.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },

  {
    path: '',canActivate:[userGuard],
    component: AuthComponent, 
    children: [
      {
        path: 'signin',
        loadComponent: () =>
          import('./features/components/signin/signin.component').then(
            (c) => c.SigninComponent
          ),
        title: 'Sign in page',
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./features/components/signup/signup.component').then(
            (c) => c.SignupComponent
          ),
        title: 'Sign up page',
      },
    ],
  },
  {
    path: 'home', canActivate:[authGuard],
    loadComponent: () =>
      import('./features/components/home/home.component').then(
        (c) => c.HomeComponent
      ),
    title: 'Home page',
  },
  { path: '**', component: NotfoundComponent, title: 'Not found page' },
];
