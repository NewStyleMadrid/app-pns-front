import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

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
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.authService.detalle(id).subscribe(data => {
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

  onUpdate(): void {
    this.spinner.show();
    const id = this.activatedRoute.snapshot.params.id;
    this.authService.actualizar(id, this.form).subscribe(
      data => {
        this.spinner.hide();
        this.toastr.success('Usuario actualizado!', ' ', {
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

  volver(): void {
    window.history.back();
  }

}
