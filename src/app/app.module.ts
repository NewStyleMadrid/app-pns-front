import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/user/list/list.component';
import { EditComponent } from './components/user/edit/edit.component';
import { DetailComponent } from './components/user/detail/detail.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DetailProductoComponent } from './components/producto/detail-producto/detail-producto.component';
import { EditProductoComponent } from './components/producto/edit-producto/edit-producto.component';
import { NuevoProductoComponent} from './components/producto/nuevo-producto/nuevo-producto.component';
import { ListProductoComponent} from './components/producto/list-producto/list-producto.component';
import { LoginComponent } from './auth/login/login.component';

// Externos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Redes sociales
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { from } from 'rxjs';





@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EditComponent,
    DetailComponent,
    RegisterComponent,
    HomeComponent,
    DetailProductoComponent,
    EditProductoComponent,
    NuevoProductoComponent,
    ListProductoComponent,
    DetailProductoComponent,
    LoginComponent
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
    MatIconModule
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
