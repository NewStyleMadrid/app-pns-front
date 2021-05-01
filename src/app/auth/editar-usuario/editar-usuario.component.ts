import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';

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
  failUsuario = false;
  msjErr = '';
  msjOK = '';

  failInit = false;

  constructor(private usuarioService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.usuarioService.detalle(id).subscribe( data => {
      this.form.nombre = data.nombre;
    },
      (err: any) => {
        this.failInit = true;
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.usuarioService.actualizar(id, this.form).subscribe(
      data => {
        this.toastr.success('Usuario actualizado!', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/listar-usuario']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error al actualizar!', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  volver(): void {
    window.history.back();
  }

}
