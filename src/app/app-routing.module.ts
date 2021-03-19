import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DetailProductoComponent } from './components/producto/detail-producto/detail-producto.component';
import { EditProductoComponent } from './components/producto/edit-producto/edit-producto.component';
import { ListProductoComponent } from './components/producto/list-producto/list-producto.component';
import { NuevoProductoComponent } from './components/producto/nuevo-producto/nuevo-producto.component';
import { DetailComponent } from './components/user/detail/detail.component';
import { EditComponent } from './components/user/edit/edit.component';


const routes: Routes = [

  // Home
  { path: '', component: HomeComponent },

  // User
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  { path: 'datail/:id', component: DetailComponent },
  { path: 'edit/:id', component: EditComponent },

  // Producto
  { path: 'nuevo', component: NuevoProductoComponent },
  { path: 'list', component: ListProductoComponent },
  { path: 'datail/:id', component: DetailProductoComponent },
  { path: 'edit/:id', component: EditProductoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
