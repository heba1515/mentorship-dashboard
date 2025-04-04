import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { MentorsComponent } from './mentors/mentors.component';
import { SessionsComponent } from './sessions/sessions.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
      path: 'users',
      component: UsersComponent,
      title: 'Users details',

  }
  ,
  {
      path: 'mentors',
      component: MentorsComponent,
      title: 'Mentors details',

  }
  ,
  {
      path: 'Sessions',
      component: SessionsComponent,
      title: 'Sessions details',

  }
  ,
];
