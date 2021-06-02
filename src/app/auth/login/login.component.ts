import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from 'src/app/components/home/home.component';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  usuario: LoginUsuario;
  isLoginFail = false;
  roles: string[] = [];
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private dRef: MatDialogRef<HomeComponent>
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLoginFail = false;

    }
  }

  onLogin(): void {
    this.usuario = new LoginUsuario(this.form.userName, this.form.password);
    this.authService.login(this.usuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.isLoginFail = false;
        this.closeLogin();
        window.location.reload();
    },
      (err: any) => {
        this.isLoginFail = true;
        this.errorMsg = err.error.message;
      }
    );
  }

  // Metodo para cerrar con la X del dialogo
  closeLogin(): void {
    this.dRef.close();
  }
}
