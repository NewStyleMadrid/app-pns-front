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

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.userName=this.tokenService.getUserName();
    }else{
      //this.isLogged = false;
      this.userName='';
    }
  
  }

  onUpdatePerfil(): void {
    /*
    this.spinner.show();
    const id = this.activatedRoute.snapshot.params.id;
    this.authService.actualizar(id, this.form).subscribe(
      data => {
        this.spinner.hide();
        this.toastr.success('Perfil actualizado!', ' ', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista-usuarios']); // Me lleva al home principal
      },
      err => {
        this.spinner.hide();
        this.msjErr = err.error.mensaje;
        this.toastr.error(this.msjErr, 'Error al actualizar!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        // console.log(err.error.message);
      });
  }
*/
  }
}
