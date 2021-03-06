import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarUsuarioComponent } from './auth/editar-usuario/editar-usuario.component';
import { ListaUsuarioComponent } from './auth/lista-usuario/lista-usuario.component';
import { LoginComponent } from './auth/login/login.component';
import { PerfilComponent } from './auth/perfil/perfil.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { EditarCitaComponent } from './components/cita/editar-cita/editar-cita.component';
import { ListaCitaComponent } from './components/cita/lista-cita/lista-cita.component';
import { NuevaCitaComponent } from './components/cita/nueva-cita/nueva-cita.component';
import { DetalleCorteComponent } from './components/corte/detalle-corte/detalle-corte.component';
import { EditarCorteComponent } from './components/corte/editar-corte/editar-corte.component';
import { ListaCorteComponent } from './components/corte/lista-corte/lista-corte.component';
import { ListadoCorteComponent } from './components/corte/listado-corte/listado-corte.component';
import { NuevoCorteComponent } from './components/corte/nuevo-corte/nuevo-corte.component';
import { HomeComponent } from './components/home/home.component';
import { NuevoHomeComponent } from './components/home/nuevo-home/nuevo-home.component';
import { ListaHomeComponent } from './components/home/lista-home/lista-home.component';
import { ListadoHomeComponent } from './components/home/listado-home/listado-home.component';
import { DetalleProductoComponent } from './components/producto/detalle-producto/detalle-producto.component';
import { EditarProductoComponent } from './components/producto/editar-producto/editar-producto.component';
import { ListaProductoComponent } from './components/producto/lista-producto/lista-producto.component';
import { NuevoProductoComponent } from './components/producto/nuevo-producto/nuevo-producto.component';
import { QuienessomosComponent } from './components/quienessomos/quienessomos.component';
import { GuardService } from './guards/guard.service';
import { LoginGuard } from './guards/login.guard';
import { ListaServicioComponent } from './components/servicio/lista-servicio/lista-servicio.component';
import { DetalleServicioComponent } from './components/servicio/detalle-servicio/detalle-servicio.component';
import { NuevoServicioComponent } from './components/servicio/nuevo-servicio/nuevo-servicio.component';
import { EditarServicioComponent } from './components/servicio/editar-servicio/editar-servicio.component';
import { ListadoServicioComponent } from './components/servicio/listado-servicio/listado-servicio.component';
import { EditarHomeComponent } from './components/home/editar-home/editar-home.component';

const routes: Routes = [

  // Home
  { path: '', component: HomeComponent },

  // Usuario
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registrar-usuario', component: RegistrarComponent, canActivate: [LoginGuard] },
  { path: 'lista-usuarios', component: ListaUsuarioComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },
  { path: 'editar-usuario/:id', component: EditarUsuarioComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },
  { path: 'mi-perfil', component: PerfilComponent, canActivate: [GuardService], data: { expectedRol: ['admin', 'user'] } },

  // Producto
  { path: 'lista-productos', component: ListaProductoComponent},
  { path: 'detalle-producto/:id', component: DetalleProductoComponent, canActivate: [GuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'nuevo-producto', component: NuevoProductoComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },
  { path: 'editar-producto/:id', component: EditarProductoComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },

  // Servicio
  { path: 'lista-servicio', component: ListaServicioComponent},
  { path: 'detalle-servicio/:id', component: DetalleServicioComponent, canActivate: [GuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'nuevo-servicio', component: NuevoServicioComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },
  { path: 'listado-servicio', component: ListadoServicioComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },
  { path: 'editar-servicio/:id', component: EditarServicioComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },

  // Cortes
  { path: 'nuevo-corte', component: NuevoCorteComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },
  { path: 'editar-corte/:id', component: EditarCorteComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },
  { path: 'listado-cortes', component: ListadoCorteComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },
  { path: 'lista-cortes', component: ListaCorteComponent },
  { path: 'detalle-corte/:id', component: DetalleCorteComponent },

  // Citas
  { path: 'nueva-cita', component: NuevaCitaComponent, canActivate: [GuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'editar-cita/:id', component: EditarCitaComponent, canActivate: [GuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'lista-cita', component: ListaCitaComponent, canActivate: [GuardService], data: { expectedRol: ['admin', 'user'] } },

  // Galer??a home
  { path: 'nuevo-home', component: NuevoHomeComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },
  { path: 'listado-home', component: ListadoHomeComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },
  { path: 'editar-home/:id', component: EditarHomeComponent, canActivate: [GuardService], data: { expectedRol: ['admin'] } },
  { path: 'lista-home', component: ListaHomeComponent },

  // About Me
  { path: 'about-me', component: QuienessomosComponent },

  // Siempre debe ir al final
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
