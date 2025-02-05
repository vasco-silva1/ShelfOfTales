import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { BookListComponent } from './BookComponents/book-list/book-list.component';
import { AvailableBooksComponent } from './BookComponents/available-books/available-books.component';
import { UnavailableBooksComponent } from './BookComponents/unavailable-books/unavailable-books.component';
import { CreateBookComponent } from './BookComponents/create-book/create-book.component';
import { GetBookComponent } from './BookComponents/get-book/get-book.component';
import { DeleteBookComponent } from './BookComponents/delete-book/delete-book.component';
import { UpdateComponent } from './BookComponents/update/update.component';
import { UpdateAvailabilityComponent } from './BookComponents/update-availability/update-availability.component';
import { CreateCategoryComponent } from './CategoryComponents/create-category/create-category.component';
import { ListCategoriesComponent } from './CategoryComponents/list-categories/list-categories.component';
import { CreateReviewComponent } from './ReviewComponents/create-review/create-review.component';

export const routes: Routes = [{ path: 'SignUp', component: SignUpComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'book', component: BookListComponent} ,
    {path:'book/available',component: AvailableBooksComponent },
    {path:'book/unavailable',component: UnavailableBooksComponent },
    { path: 'book/create', component: CreateBookComponent },
    { path: 'book/:isbn', component: GetBookComponent }, // Define o ISBN como parâmetro
    { path: 'book/:isbn/delete', component: DeleteBookComponent },
    { path: 'book/:isbn/update', component: UpdateComponent },
    { path: 'book/:isbn/availability', component: UpdateAvailabilityComponent },
    { path: 'category/create', component: CreateCategoryComponent },
    { path: 'category', component: ListCategoriesComponent },
    { path: 'book/:isbn/review', component: CreateReviewComponent }
    // { path: 'book/:isbn/review/list', component: }
]
;
