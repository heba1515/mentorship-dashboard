import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { MentorsComponent } from './mentors/mentors.component';
import { SessionsComponent } from './sessions/sessions.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: 'users',
    component: UsersComponent,
    title: 'Users details',

  },
  {
    path: 'mentors',
    component: MentorsComponent,
    title: 'Mentors details',
  },
  {
    path: 'sessions',
    component: SessionsComponent,
    title: 'Sessions details',
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    title: 'Transactions details',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'Settings details',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Profile details',
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];
