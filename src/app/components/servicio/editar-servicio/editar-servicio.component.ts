import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit {

  servicio: Servicio = null;
  form: any = {};
  actualizado = false;
  failActualizado = false;
  msjErr = '';
  msjOK = '';
  failInit = false;

  constructor(
    private servicioService: ServicioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.servicioService.detalle(id).subscribe(data => {
      this.form.tipoServicio=data.tipoServicio;
      this.form.precioMujer=data.precioMujer;
      this.form.precioHombre=data.precioHombre;
      this.form.precioNinio=data.precioNinio;
      this.form.precioAdulto=data.precioAdulto;
    },
      (err: any) => {
        this.failInit = true;
        this.router.navigate(['']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.servicioService.actualizar(id, this.form).subscribe(
      data => {
        this.toastr.success('Servicio actualizado!', '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista-servicio']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error al actualizar servicio!', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  volver(): void {
    window.history.back();
  }
}
