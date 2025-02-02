import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { BookListComponent } from './BookComponents/book-list/book-list.component';

export const routes: Routes = [{ path: 'SignUp', component: SignUpComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'books', component: BookListComponent }
];
