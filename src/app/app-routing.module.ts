import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { DetalleComponent } from './components/diseño/detalle/detalle.component';
import { ListaComponent } from './components/diseño/lista/lista.component';
import { NuevoComponent } from './components/diseño/nuevo/nuevo.component';
import { HomeComponent } from './components/home/home.component';
import { DetalleProductoComponent } from './components/producto/detalle-producto/detalle-producto.component';
import { EditarProductoComponent } from './components/producto/editar-producto/editar-producto.component';
import { ListaProductoComponent } from './components/producto/lista-producto/lista-producto.component';
import { NuevoProductoComponent } from './components/producto/nuevo-producto/nuevo-producto.component';
import { GuardService  } from './guards/guard.service';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [

  // Home
  { path: '', component: HomeComponent },

  // Usuario
  { path: 'login', component: LoginComponent,canActivate: [LoginGuard] },
  { path: 'registrar-usuario', component: RegistrarComponent,canActivate: [LoginGuard]  },

  // Producto
  { path: 'lista-producto', component: ListaProductoComponent },
  { path: 'detalle/:id', component: DetalleProductoComponent, canActivate: [GuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'nuevo-producto', component: NuevoProductoComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },
  { path: 'editar/:id', component: EditarProductoComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },

  // Diseño
  { path: 'nuevo-diseño', component: NuevoComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },
  { path: 'lista-diseño', component: ListaComponent },
  { path: 'detalle/:id', component: DetalleComponent },

  // Siempre debe ir al final
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
