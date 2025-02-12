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
import { ListreviewComponent } from './ReviewComponents/listreview/listreview.component';
import { clientGuard } from './BookComponents/guards/client.guard';
import { HomeComponent } from './pages/home/home.component';
import { managerGuard } from './BookComponents/guards/manager.guard';

export const routes: Routes = [
  { path: 'SignUp', component: SignUpComponent },
    { path: 'signin', component: SignInComponent },

    { path: 'book', component: BookListComponent, canActivate : [clientGuard],children : [
      {
        path: ':isbn',
        component: GetBookComponent, // ✅ Agora GetBookComponent é carregado como modal dentro da página
        children: [
          { path: 'delete', component: DeleteBookComponent },
          { path: 'update', component: UpdateComponent },
          { path: 'review', component: ListreviewComponent }
        ]
      }
    ] },

    {path:'book/available',component: BookListComponent ,children : [
      {
        path: ':isbn',
        component: GetBookComponent, // ✅ Agora GetBookComponent é carregado como modal dentro da página
        children: [
          { path: 'delete', component: DeleteBookComponent },
          { path: 'update', component: UpdateComponent },
          { path: 'review', component: ListreviewComponent ,children: [{ path: 'write', component: CreateReviewComponent }]}
        ]
      }
    ]
  },

    {path:'book/unavailable',component: BookListComponent  ,children : [
      {
        path: ':isbn',
        component: GetBookComponent, // ✅ Agora GetBookComponent é carregado como modal dentro da página
        children: [
          { path: 'delete', component: DeleteBookComponent },
          { path: 'update', component: UpdateComponent },
          { path: 'review', component: ListreviewComponent }
        ]
      }
    ]},
    { path: 'book/create', component: CreateBookComponent },
    { path: 'book/:isbn', component: GetBookComponent, children :[ { path: 'book/:isbn/delete', component: DeleteBookComponent },
       { path: 'book/:isbn/update', component: UpdateComponent },{ path: 'book/:isbn/review', component: ListreviewComponent }]}
       
       

   ,
    { path: 'book/:isbn/availability', component: UpdateAvailabilityComponent },
    { path: 'category/create', component: CreateCategoryComponent },
    { path: 'category', component: ListCategoriesComponent },
    { path: 'book/:isbn/review/write', component: CreateReviewComponent },
    { path: 'unauthorized', component: SignInComponent}, // Ensure this route is configured
      { path: '', component: HomeComponent }, // Página inicial acessível a todos
      { path: '**', redirectTo: '' } // Redireciona qualquer rota inválida para a Home
      
]
;
