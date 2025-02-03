import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { BookListComponent } from './BookComponents/book-list/book-list.component';
import { AvailableBooksComponent } from './BookComponents/available-books/available-books.component';
import { UnavailableBooksComponent } from './BookComponents/unavailable-books/unavailable-books.component';
import { CreateBookComponent } from './BookComponents/create-book/create-book.component';
import { GetBookComponent } from './BookComponents/get-book/get-book.component';
import { DeleteBookComponent } from './BookComponents/delete-book/delete-book.component';

export const routes: Routes = [{ path: 'SignUp', component: SignUpComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'book', component: BookListComponent} ,
    {path:'book/available',component: AvailableBooksComponent },
    {path:'book/unavailable',component: UnavailableBooksComponent },
    { path: 'book/create', component: CreateBookComponent },
    { path: 'book/:isbn', component: GetBookComponent }, // Define o ISBN como parâmetro
    { path: 'book/:isbn/delete', component: DeleteBookComponent }

]
;
