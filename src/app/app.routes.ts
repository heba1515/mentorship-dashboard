import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { MentorsComponent } from './mentors/mentors.component';
import { SessionsComponent } from './sessions/sessions.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ChatLayoutComponent } from './layouts/chat-layout/chat-layout.component';
import { AdminsComponent } from './admins/admins.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AuthLayoutComponent,
    title: 'Auth Layout',
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        title: 'Dashboard',
      },
      {
        path: 'admins',
        component: AdminsComponent,
        title: 'Admins details',

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
    ],
    title: 'Dashboard Layout',
  },
  {
    path: 'chat',
    component: ChatLayoutComponent,
    title: 'Chat Layout',
  },
];
