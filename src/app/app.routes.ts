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
import { managerGuard } from './BookComponents/guards/manager.guard';
import { TryHomeComponent } from './pages/try-home/try-home.component';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { ManagerDashboardComponent } from './pages/Manager-dashboard/manager-dashboard.component';
import { RoleRedirectGuard } from './BookComponents/guards/role.guard';
import { GetuserComponent } from './UserComponents/getuser/getuser.component';

export const routes: Routes = [
  { path: '', component: TryHomeComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  
  // 📌 Client Dashboard Routes
  { path: "client", component: ClientDashboardComponent, canActivate:[clientGuard], children: [ { path: 'user', component: GetuserComponent },{ path: 'category', component: ListCategoriesComponent },
    {path:'book/available',component:AvailableBooksComponent ,children : [
    {
      path: ':isbn',
      component: GetBookComponent, 
      children: [
        { path: 'delete', component: DeleteBookComponent },
        { path: 'update', component: UpdateComponent },
        { path: 'review', component: ListreviewComponent },
        { path: 'review/write', component: CreateReviewComponent } 
      ]
    }
  ]
},
    // 📚 All Books for client
    { path: 'book/all', component: BookListComponent, children: [
      { path: ':isbn', component: GetBookComponent, children: [
        { path: 'delete', component: DeleteBookComponent },
        { path: 'update', component: UpdateComponent },
        { path: 'review', component: ListreviewComponent },
        { path: 'review/write', component: CreateReviewComponent } 
      ]}
    ]}]},
  
      // 📌 Manager Dashboard Routes
    { path: "manager", component: ManagerDashboardComponent, canActivate:[managerGuard], children: [{ path: 'book/create', component: CreateBookComponent }, { path: 'user', component: GetuserComponent },{ path: 'category', component: ListCategoriesComponent }, 
      { path: 'category/create', component: CreateCategoryComponent },{path:'book/unavailable',component:UnavailableBooksComponent ,children : [
      {
        path: ':isbn',
        component: GetBookComponent, // ✅ Agora GetBookComponent é carregado como modal dentro da página
        children: [
          { path: 'delete', component: DeleteBookComponent },
          { path: 'update', component: UpdateComponent },
          { path: 'availability', component: UpdateAvailabilityComponent },
          { path: 'review', component: ListreviewComponent ,children: [{ path: 'write', component: CreateReviewComponent }]}
        ]
      }
    ]
  },{ path: 'book/available', component: AvailableBooksComponent, children: [
    { path: ':isbn', component: GetBookComponent, children: [
      { path: 'delete', component: DeleteBookComponent },
      { path: 'update', component: UpdateComponent },
      { path: 'availability', component: UpdateAvailabilityComponent },
      { path: 'review', component: ListreviewComponent,children:[{ path: 'write', component: CreateReviewComponent }] },
       
    ]}
  ]}]},
    

// 📌 Unregisted Dashboard Routes

    {path:'book/available',component:AvailableBooksComponent},
    {path:'book/available/:isbn',component:GetBookComponent},
    { path: 'category', component: ListCategoriesComponent },

    {path:'book/unavailable',component: BookListComponent  ,children : [
      {
        path: ':isbn',
        component: GetBookComponent, 
        children: [
          { path: 'delete', component: DeleteBookComponent },
          { path: 'update', component: UpdateComponent },
          { path: 'review', component: ListreviewComponent }
        ]
      }
    ]},
    ///general routes

    { path: 'book/:isbn', component: GetBookComponent },
    { path: 'user', component: GetuserComponent },
    { path: 'category/create', component: CreateCategoryComponent },
    { path: 'category', component: ListCategoriesComponent },
    { path: 'write', component: CreateReviewComponent },
    { path: 'unauthorized', component: SignInComponent}, 
    { path: '**', component:TryHomeComponent,canActivate:[RoleRedirectGuard] } // Redireciona qualquer rota inválida para a Home
      
]
;
