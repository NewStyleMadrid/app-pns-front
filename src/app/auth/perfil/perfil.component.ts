import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  userName = '';
  usuario: NuevoUsuario = null;
  form: any = {};
  actualizado = false;
  failActualizado = false;
  msjErr = '';
  msjOK = '';
  failInit = false;
  usu: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private tokenService: TokenService
  ) { }

  currentUser: any;

  ngOnInit() {
    this.authService.detallePerfil(this.tokenService.getUserName()).subscribe(data => {
      //console.log(data);
      this.form.nombre = data.nombre;
      this.form.apellidos = data.apellidos;
      this.form.userName = data.userName;
      this.form.password = data.password;
      this.form.email = data.email;
    },
      (err: any) => {
        this.failInit = true;
        this.router.navigate(['/']);
      }
    );
  }

  onUpdatePerfil(): void {
    this.authService.detallePerfil(this.tokenService.getUserName()).subscribe(data => {
      this.authService.actualizar(data.id, this.form).subscribe(
        data => {
          this.toastr.success('Perfil actualizado!', ' ', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/lista-usuarios']); // Me lleva al home principal
        },
        err => {
          this.msjErr = err.error.mensaje;
          this.toastr.error(this.msjErr, 'Error al actualizar tu perfil!', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.router.navigate(['/']); // Me lleva al home principal
        });
    });
  }
}
