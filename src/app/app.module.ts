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

// Login
import { LoginComponent } from './auth/login/login.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';

// Producto
import { ListaProductoComponent } from './components/producto/lista-producto/lista-producto.component';
import { NuevoProductoComponent } from './components/producto/nuevo-producto/nuevo-producto.component';
import { EditarProductoComponent } from './components/producto/editar-producto/editar-producto.component';
import { DetalleProductoComponent } from './components/producto/detalle-producto/detalle-producto.component';
import { interceptorProvider } from './interceptors/producto-interceptor.service'; // Interceptor 

// Diseño
import { NuevoComponent } from './components/diseño/nuevo/nuevo.component';
import { ListaComponent } from './components/diseño/lista/lista.component';
import { DetalleComponent } from './components/diseño/detalle/detalle.component';

// Externos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
import { ProgressBarModule } from "angular-progress-bar";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Redes sociales
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

// Quienes somos
import { QuienessomosComponent } from './components/quienessomos/quienessomos.component';

// Footer
import { FooterComponent } from './components/footer/footer.component';
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

    // Producto
    ListaProductoComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
    DetalleProductoComponent,

    // Diseño
    NuevoComponent,
    ListaComponent,
    DetalleComponent,

    // Quienes somos
    QuienessomosComponent,

    // Footer
    FooterComponent,

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
    MatProgressSpinnerModule
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
  entryComponents: [DetalleComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
