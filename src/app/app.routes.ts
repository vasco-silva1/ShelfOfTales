import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [{ path: 'SignUp', component: SignUpComponent },
    { path: 'signin', component: SignInComponent }
];
