import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Home
import { HomeComponent } from './components/home/home.component';

// Menu
import { MenuComponent } from './components/menu/menu.component';

// Login - Usuario
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { ListaUsuarioComponent } from './auth/lista-usuario/lista-usuario.component';
import { EditarUsuarioComponent } from './auth/editar-usuario/editar-usuario.component';

// Producto
import { ListaProductoComponent } from './components/producto/lista-producto/lista-producto.component';
import { NuevoProductoComponent } from './components/producto/nuevo-producto/nuevo-producto.component';
import { EditarProductoComponent } from './components/producto/editar-producto/editar-producto.component';
import { DetalleProductoComponent } from './components/producto/detalle-producto/detalle-producto.component';
import { interceptorProvider } from './interceptors/producto-interceptor.service'; // Interceptor

// Diseño
import { DetalleCorteComponent } from './components/corte/detalle-corte/detalle-corte.component';
import { NuevoCorteComponent } from './components/corte/nuevo-corte/nuevo-corte.component';
import { ListaCorteComponent } from './components/corte/lista-corte/lista-corte.component';

// Externos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
import { ProgressBarModule } from "angular-progress-bar";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';

// Redes sociales
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

// Quienes somos
import { QuienessomosComponent } from './components/quienessomos/quienessomos.component';

// Footer
import { FooterComponent } from './components/footer/footer.component';
import { ScrollToTopComponent } from './components/shared/scroll-to-top/scroll-to-top.component';


@NgModule({
  declarations: [

    // APP
    AppComponent,

    // Home
    HomeComponent,

    // Menu
    MenuComponent,

    // User
    LoginComponent,
    RegistrarComponent,
    ListaUsuarioComponent,
    EditarUsuarioComponent,

    // Producto
    ListaProductoComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
    DetalleProductoComponent,

    // Diseño
    DetalleCorteComponent,
    NuevoCorteComponent,
    ListaCorteComponent,


    // Quienes somos
    QuienessomosComponent,

    // Footer
    FooterComponent,

    ScrollToTopComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgbModule,
    NgbModalModule,
    NgxSpinnerModule,
    ProgressBarModule,
    MatProgressSpinnerModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '70170327715-93rnc0ln1mpkru6b3nnra1eq1bp28o79.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('331028708227771')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    interceptorProvider // Interceptor de producto
  ],
  entryComponents: [DetalleCorteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
