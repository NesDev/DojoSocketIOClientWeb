import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

export const ROUTES = [
  {
    path: 'login',
    component: LoginComponent,
    resolve: {},
    data: {
      roles: ['ROLE_USER'],
    },
  },
  {
    path: 'signup',
    component: SignupComponent,
    resolve: {},
    data: {
      roles: ['ROLE_USER'],
    },
  }
];
